import { Request } from 'express';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { messages } from '@/config/messages';
import { sanitize, isValidEmail } from '@/utils/helpers';
import userCreate from '../share/userCreate';
import { Argument, NewUser } from '../types';
import { User, UserProps } from '@/database';
import { JWT } from '@/config/jwt';
import sendGrid from '@/apis/sendgrid/index';

const { SERVICE_EMAIL } = process.env;

export const signup = async ({ arg }: Argument<NewUser>, req: Request) => {
  const form = sanitize(arg);

  if (!isValidEmail(form.email)) return messages.failed.invalidEmail;

  try {
    let user: UserProps = await User.findOne({
      email: form.email.toLowerCase()
    });

    if (!user) {
      user = await userCreate.signupUser(form);
    }

    const loginToken = await new JWT({
      userId: user._id,
      type: 'login'
    }).sign();
    const loginUrl = getLoginUrl(loginToken, req.headers.origin);
    await sendMail(
      form.email,
      loginUrl,
      req.headers.origin.includes('redxam.ae') ||
        req.headers.referer.includes('/ar/') ||
        req.headers.referer.endsWith('/ar') ||
        req.headers.currenturl.includes('/ar/') ||
        (req.headers.currenturl as string).endsWith('/ar')
        ? 'ar'
        : 'en'
    );

    return messages.success.register;
  } catch (error) {
    console.error(error.message);
    return messages.failed.general;
  }
};

const getLoginUrl = (token: string, origin: string) =>
  origin + `/verify?token=${token}`;

const renderTemplate = (loginURL: string, language: string) =>
  render(language === 'ar' ? templateArabicData : templateData, {
    loginURL,
    randomText: `Ref #: ${Date.now()}`
  });

const sendMail = async (
  targetEmail: string,
  loginUrl: string,
  language: string
) => {
  try {
    await sendGrid.sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: targetEmail,
      subject: 'Signup Email',
      html: renderTemplate(loginUrl, language),
      attachments: [
        facebookIcon,
        twitterIcon,
        linkedInIcon,
        telegramIcon,
        discordIcon
      ]
    });
  } catch (e) {
    console.log(e);
  }
};

const templatePath = resolve(__dirname, '../../emails/simplelogin.hjs');
const templateData = readFileSync(templatePath, 'utf-8');
const templateArabicPath = resolve(
  __dirname,
  '../../emails/simplelogin_ar.hjs'
);
const templateArabicData = readFileSync(templateArabicPath, 'utf-8');

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@login',
  disposition: 'inline'
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@login',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@login',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@login',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@login',
  disposition: 'inline'
});
