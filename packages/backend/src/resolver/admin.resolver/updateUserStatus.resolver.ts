import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Attachment } from 'nodemailer/lib/mailer';
import { Admin, User, UserProps } from '@/database';
import { sendMail } from '@/apis/sendgrid';
import { generateCode } from '@/utils/helpers';
import getAuthorizationToken from '../share/getAuthorizationToken';

const { SERVICE_EMAIL, TOKEN_SECURITY_KEY } = process.env;

interface adminToken {
  adminId: string;
}

interface Response {
  success: boolean;
  message: string;
}

export const updateUserStatus = async (
  { arg }: { arg: { email: string; status: 'invited' | 'accepted' } },
  req: Request
): Promise<Response> => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };

  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;

    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };

    const user = await User.findOne({ email: arg.email });
    if (!user)
      return { success: false, message: 'email is not in the waitlist' };
    if (user.accountStatus === arg.status)
      return { success: false, message: `user is already ${arg.status}` };

    await handleChangeAccountStatus(user, arg.status);

    return { success: true, message: 'user status updated succesfully' };
  } catch (err) {
    return { message: err.message, success: false };
  }
};

const handleChangeAccountStatus = async (user: UserProps, status: string) => {
  await user.updateOne({ $set: { accountStatus: status } });
  await handleEmail(user);
};

const handleEmail = async (user: UserProps) => {
  await sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: user.email,
    subject: 'You got access 🎉 | redxam',
    html: render(templateData, {
      code: generateCode(user.email),
      randomText: `Ref #: ${Date.now()}`
    }),
    attachments: [
      facebookIcon,
      twitterIcon,
      linkedInIcon,
      telegramIcon,
      discordIcon
    ]
  });
};

const templatePath = resolve(__dirname, '../../emails/invited.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@invited',
  disposition: 'inline'
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@invited',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@invited',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@invited',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@invited',
  disposition: 'inline'
});
