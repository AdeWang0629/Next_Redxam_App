import sendGrid from '@/apis/sendgrid/index';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';

const { SERVICE_EMAIL } = process.env;

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@ico',
  disposition: 'inline'
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@ico',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@ico',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@ico',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@ico',
  disposition: 'inline'
});

interface Args {
  email: string;
  subject: string;
  [key: string | number | symbol]: unknown;
}

export const sendUserEmail = (
  dirname: string,
  template: string,
  args: Args
) => {
  const templatePath = resolve(dirname, template);
  const templateData = readFileSync(templatePath, 'utf-8');
  return sendGrid.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: args.email,
    subject: args.subject,
    html: render(templateData, args),
    attachments: [
      facebookIcon,
      twitterIcon,
      linkedInIcon,
      telegramIcon,
      discordIcon
    ]
  });
};
