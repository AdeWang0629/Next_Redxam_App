import 'dotenv/config';
import '@/database';

import { connection } from 'mongoose';
import { Attachment } from 'nodemailer/lib/mailer';
import { transporter } from '@/service/emailService';
import { resolve } from 'path';
import { render } from 'mustache';
import { readFileSync } from 'fs';
import { User } from '@/database';
import { generateCode } from '@/utils/helpers';

connection.on('connected', handleAccountChange);
connection.on('error', exit);

const email = process.argv[2];

const templatePath = resolve(__dirname, '../emails/invited.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const { SERVICE_EMAIL } = process.env;

function renderTemplate(code: string) {
  return render(templateData, {
    code,
    randomText: `Ref #: ${Date.now()}`,
  });
}

function getAttachments() {
  const facebookIcon: Readonly<Attachment> = Object.freeze({
    filename: 'facebook.png',
    path: resolve(__dirname, '../emails/facebook.png'),
    cid: 'facebook@invited',
  });

  const twitterIcon: Readonly<Attachment> = Object.freeze({
    filename: 'twitter.png',
    path: resolve(__dirname, '../emails/twitter.png'),
    cid: 'twitter@invited',
  });

  const linkedInIcon: Readonly<Attachment> = Object.freeze({
    filename: 'linkedin.png',
    path: resolve(__dirname, '../emails/linkedin.png'),
    cid: 'linkedin@invited',
  });

  const telegramIcon: Readonly<Attachment> = Object.freeze({
    filename: 'telegram.png',
    path: resolve(__dirname, '../emails/telegram.png'),
    cid: 'telegram@invited',
  });

  const discordIcon: Readonly<Attachment> = Object.freeze({
    filename: 'discord.png',
    path: resolve(__dirname, '../emails/discord.png'),
    cid: 'discord@invited',
  });

  return [facebookIcon, twitterIcon, linkedInIcon, telegramIcon, discordIcon];
}

async function sendMail(code: string) {
  await transporter.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: email,
    subject: 'You got access 🎉 | redxam',
    html: renderTemplate(code),
    attachments: getAttachments(),
  });
}

async function handleAccountChange() {
  let userData = await User.findOne({ email });

  if (!userData) {
    console.error('[ERROR] : User not found');
    return exit();
  }

  if (userData.accountStatus === 'accepted') {
    console.error('[ERROR] : User already accepted');
    return exit();
  }

  if (userData.accountStatus === 'invited') {
    console.error('[ERROR] : User already invited');
    return exit();
  }

  let code = generateCode(email);

  Promise.all([sendMail(code), userData.updateOne({ accountStatus: 'invited' })])
    .then(() => {
      console.log('[INFO] : Successfully invited');
      return exit();
    })
    .catch(err => {
      console.error('[ERROR] : ', err);
      return exit();
    });
}

function exit() {
  console.log('[INFO] : Exiting..');
  return process.exit();
}
