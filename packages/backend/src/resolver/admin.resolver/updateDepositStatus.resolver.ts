import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Attachment } from 'nodemailer/lib/mailer';
import { Admin, Deposits, DepositsProps, User, UserProps } from '@/database';
import { sendMail } from '@/apis/sendgrid';
import getAuthorizationToken from '../share/getAuthorizationToken';

const { SERVICE_EMAIL, TOKEN_SECURITY_KEY } = process.env;

interface adminToken {
  adminId: string;
}

interface Response {
  success: boolean;
  message: string;
}

export const updateDepositStatus = async (
  { arg }: { arg: { depositId: string; status: 'completed' | 'pending' } },
  req: Request
): Promise<Response> => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };

  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;

    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };

    const deposit = await Deposits.findOne({ _id: arg.depositId });
    if (!deposit)
      return { success: false, message: 'deposit is not in the waitlist' };

    if (deposit.status === arg.status)
      return {
        success: false,
        message: `deposit status is already ${arg.status}`
      };

    const user = await User.findOne({ _id: deposit.userId });

    await handleChangeDepositStatus(deposit, arg.status, user);

    return { success: true, message: 'deposit status updated succesfully' };
  } catch (err) {
    console.log(err);
    return { message: err.message, success: false };
  }
};

const handleChangeDepositStatus = async (
  deposit: DepositsProps,
  status: string,
  user: UserProps
) => {
  await deposit.updateOne({ $set: { status, processedByRedxam: true } });
  await handleEmail(user.email);
};

const handleEmail = async (userEmail: string) => {
  await sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: userEmail,
    subject: 'Your deposit got processed by redxam 🎉',
    html: render(templateData, {
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

const templatePath = resolve(__dirname, '../../emails/depositStatus.hjs');
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
