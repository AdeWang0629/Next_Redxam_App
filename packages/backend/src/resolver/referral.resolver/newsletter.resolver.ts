import { messages } from '@/config/messages';
import { User } from '@/database';
import { SimpleWallet } from '@/database/types';
import { transporter } from '@/service/emailService';
import { generateWallet } from '@/service/wallets';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { resolve } from 'path';
import { Argument, LoginInput, NewUser } from '../types';
const { SERVICE_EMAIL } = process.env;

const templatePath = resolve(__dirname, '../../emails/newsletter.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const topAttachment = Object.freeze<Attachment>({
  filename: 'top.png',
  path: resolve(__dirname, '../../emails/top.png'),
  cid: 'top@background',
});

const logoAttachment = Object.freeze<Attachment>({
  filename: 'logo.png',
  path: resolve(__dirname, '../../assets/images/logo.png'),
  cid: 'logo@top',
});

const elipseAttachment = Object.freeze<Attachment>({
  filename: 'elipse.png',
  path: resolve(__dirname, '../../emails/elipse.png'),
  cid: 'elipse@top',
});

const greenAttachment = Object.freeze<Attachment>({
  filename: 'green.png',
  path: resolve(__dirname, '../../emails/green.png'),
  cid: 'green@top',
});

const redAttachment = Object.freeze<Attachment>({
  filename: 'red.png',
  path: resolve(__dirname, '../../emails/red.png'),
  cid: 'red@top',
});

const elipseListAttachment = Object.freeze<Attachment>({
  filename: 'elipse-list.png',
  path: resolve(__dirname, '../../emails/elipse-list.png'),
  cid: 'elipse-list@top',
});

const facebookAttachment = Object.freeze<Attachment>({
  filename: 'facebook.png',
  path: resolve(__dirname, '../../emails/Facebook.png'),
  cid: 'facebook@top',
});

const twitterAttachment = Object.freeze<Attachment>({
  filename: 'Twitter.png',
  path: resolve(__dirname, '../../emails/Twitter.png'),
  cid: 'Twitter@top',
});

const InstagramAttachment = Object.freeze<Attachment>({
  filename: 'Instagram.png',
  path: resolve(__dirname, '../../emails/Instagram.png'),
  cid: 'Instagram@top',
});

const sendMail = async (email: string, origin: string) => {
  const renderedTemplate = render(templateData, { frontEndURL: origin });

  await transporter.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: email,
    subject: 'Welcome to redxam.com!',
    html: renderedTemplate,
    attachments: [
      topAttachment,
      logoAttachment,
      elipseAttachment,
      greenAttachment,
      redAttachment,
      elipseListAttachment,
      facebookAttachment,
      twitterAttachment,
      InstagramAttachment,
    ],
  });
};

export const newsLetterDemo = async ({ arg }: Argument<LoginInput>, req: Request) => {
  console.debug('[Resolver] createUser called');
  sendMail(arg.email, req.headers.origin);
  try {
    return messages.success.general;
  } catch {
    return messages.failed.general;
  }
};
