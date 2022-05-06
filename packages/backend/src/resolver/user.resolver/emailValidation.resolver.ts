import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { User } from '@/database';
import { sendMail } from '@/apis/sendgrid/index';
import { messages } from '@/config/messages';
import { createWaitlist } from '../referral.resolver/createWaitlist.resolver';
import getAuthorizationToken from '../share/getAuthorizationToken';
import { Argument, NewUser } from '../types';

const { TOKEN_SECURITY_KEY, SERVICE_EMAIL } = process.env;

export const emailValidation = async (
  { arg }: Argument<NewUser>,
  req: Request
) => {
  console.log(req.headers.origin);
  try {
    if (await isUser(arg.email)) {
      return await createWaitlist({ arg }, req);
    }
    const verificationToken = sign({ ...arg }, TOKEN_SECURITY_KEY, {
      expiresIn: '1h'
    });
    const language =
      req.headers.origin.includes('redxam.ae') ||
      req.headers.referer.includes('/ar/') ||
      req.headers.referer.endsWith('/ar') ||
      req.headers.currenturl.includes('/ar/') ||
      (req.headers.currenturl as string).endsWith('/ar')
        ? 'ar'
        : 'en';

    await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: arg.email,
      subject: 'Verification email from redxam',
      attachments: [
        facebookIcon,
        twitterIcon,
        linkedInIcon,
        telegramIcon,
        discordIcon
      ],
      html: render(language === 'ar' ? templateArabicData : templateData, {
        verificationToken,
        origin: req.headers.origin
      })
    });
    return { success: true, message: 'verification email sent succesfully' };
  } catch (error) {
    return { message: error.message, success: false };
  }
};

export const emailValidateToken = async (_: void, req: Request) => {
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return auth;
  try {
    const payload: NewUser = verify(auth.token, TOKEN_SECURITY_KEY) as NewUser;

    return await createWaitlist({ arg: payload }, req);
  } catch (error) {
    return { message: error.message, success: false };
  }
};

const isUser = async (email: string): Promise<boolean> =>
  (await User.findOne({ email })) !== null;

const templatePath = resolve(__dirname, '../../emails/verification.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const templateArabicPath = resolve(
  __dirname,
  '../../emails/verification_ar.hjs'
);
const templateArabicData = readFileSync(templateArabicPath, 'utf-8');

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@waitlist',
  disposition: 'inline'
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@waitlist',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@waitlist',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@waitlist',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@waitlist',
  disposition: 'inline'
});
