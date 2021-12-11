import { JWT } from '@/config/jwt';
import { messages, Message } from '@/config/messages';
import { verify } from '@/config/twlio';
import { User, UserProps } from '@/database';
import { transporter } from '@/service/emailService';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { resolve } from 'path';
import { resolver } from '..';
import { Argument, LoginInput } from '../types';

const { NODE_ENV, SERVICE_EMAIL } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

const ADMIN_USERS = Object.freeze(['max@redxam.com']);
const isAdmin = (email: string) => ADMIN_USERS.includes(email);

const getLoginUrl = (token: string, origin: string) => origin + `/verify?token=${token}`;

const templatePath = resolve(__dirname, '../../emails/simplelogin.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const renderTemplate = (loginURL: string) =>
  render(templateData, {
    loginURL,
    randomText: `Ref #: ${Date.now()}`,
  });

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  path: resolve(__dirname, '../../emails/facebook.png'),
  cid: 'facebook@login',
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  path: resolve(__dirname, '../../emails/twitter.png'),
  cid: 'twitter@login',
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  path: resolve(__dirname, '../../emails/linkedin.png'),
  cid: 'linkedin@login',
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  path: resolve(__dirname, '../../emails/telegram.png'),
  cid: 'telegram@login',
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  path: resolve(__dirname, '../../emails/discord.png'),
  cid: 'discord@login',
});

const updateUserToken = async (
  userId: string,
  token: string,
  updateVerification?: { value: boolean },
) => {
  await User.updateOne(
    { _id: userId },
    updateVerification
      ? { $set: { token, verification: updateVerification.value } }
      : { $set: { token } },
  ).exec();
};

const loginAdmin = async (userId: string) => {
  const token = new JWT({ userId, type: 'verified' }).signSync();
  await updateUserToken(userId, token, { value: true });

  return { ...messages.success.login, token };
};

const sendMail = async (targetEmail: string, loginUrl: string) => {
  try {
    await transporter.sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: targetEmail,
      subject: 'Login Email',
      html: renderTemplate(loginUrl),
      attachments: [facebookIcon, twitterIcon, linkedInIcon, telegramIcon, discordIcon],
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchUser = async (
  data: string,
): Promise<Pick<UserProps, '_id' | 'accountStatus'>> => {
  return User.findOne(
    { $or: [{ email: data }, { phone: data }] },
    { _id: 1, accountStatus: 1 },
  )
    .lean()
    .exec();
};

const updateByEmail = async (userId: string, email: string, origin: string) => {
  if (!IS_PRODUCTION && isAdmin(email)) {
    return loginAdmin(userId);
  }
  const loginToken = await new JWT({ userId, type: 'login' }).sign();
  const loginUrl = getLoginUrl(loginToken, origin);
  console.log(loginToken);
  await sendMail(email, loginUrl);
  return messages.success.loginByEmail;
};

const updateByPhone = async (userId: string, phone: string) => {
  const verification = await verify(phone);
  console.debug(verification);

  await updateUserToken(userId, '');
  return messages.success.loginByPhone;
};

export const updateToken = async ({ arg }: Argument<LoginInput>, req: Request) => {
  console.debug('[Resolver] updateToken called');
  if (!arg.email && arg.phone) {
    return messages.failed.general;
  }
  const user = await fetchUser(arg.email || arg.phone);
  if (!user) {
    console.warn('[Resolver] updateToken no user');
    return messages.failed.general;
  }

  if (!['accepted', 'invited'].includes(user.accountStatus)) {
    console.warn('[Resolver] updateToken user account is not accepted and not invited');
    return messages.failed.general;
  }

  try {
    0;
    let result: Message;
    if (arg.email) {
      result = await updateByEmail(user._id, arg.email, req.headers.origin);
    } else if (arg.phone) {
      result = await updateByPhone(user._id, arg.phone);
    }

    return result;
  } catch {
    return messages.failed.general;
  }
};
