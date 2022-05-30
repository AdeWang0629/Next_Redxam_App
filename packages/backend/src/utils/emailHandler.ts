import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { sendMail } from '@/apis/sendgrid';
const { SERVICE_EMAIL } = process.env;

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@invited',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@invited',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@invited',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@invited',
  disposition: 'inline'
});

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@invited',
  disposition: 'inline'
});

export const handleEmail = async (
  userEmail: string,
  templateName: string,
  subject: string,
  data: any = {}
) => {
  const templatePath = resolve(
    __dirname,
    `../emails/templates/${templateName}.hjs`
  );
  const templateData = readFileSync(templatePath, 'utf-8');

  await sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: userEmail,
    subject: subject,
    html: render(templateData, {
      randomText: `Ref #: ${Date.now()}`,
      ...data
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
