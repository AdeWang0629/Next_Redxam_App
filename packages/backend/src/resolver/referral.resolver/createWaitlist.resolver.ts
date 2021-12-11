import { User } from '@/database';
import { Argument, NewUser } from '../types';
import { generateWallet } from '@/service/wallets';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { transporter } from '@/service/emailService';
import { Attachment } from 'nodemailer/lib/mailer';
import { SimpleWallet } from '@/database/types';
import { messages } from '@/config/messages';
import { Request } from 'express';

const { SERVICE_EMAIL } = process.env;

const templatePath = resolve(__dirname, '../../emails/simplewaitlist.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const renderTemplate = (email: string, lastOrder: number, origin: string) => {
  return render(templateData, {
    frontEndURL: origin,
    lastOrder,
    email,
    randomText: `Ref #: ${Date.now()}`,
  });
};

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  path: resolve(__dirname, '../../emails/facebook.png'),
  cid: 'facebook@waitlist',
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  path: resolve(__dirname, '../../emails/twitter.png'),
  cid: 'twitter@waitlist',
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  path: resolve(__dirname, '../../emails/linkedin.png'),
  cid: 'linkedin@waitlist',
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  path: resolve(__dirname, '../../emails/telegram.png'),
  cid: 'telegram@waitlist',
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  path: resolve(__dirname, '../../emails/discord.png'),
  cid: 'discord@waitlist',
});

const fetchLastOrder = async (email: string) => {
  const userByEmail = await User.findOne({ email }, { _id: 0, level: 1 }).lean().exec();

  if (userByEmail)
    return {
      level: userByEmail.level,
      doesExist: true,
    };

  const userByLevel = await User.findOne({}, { _id: 0, level: 1 })
    .sort({ level: -1 })
    .lean()
    .exec();

  if (userByLevel)
    return {
      level: userByLevel.level,
      doesExist: false,
    };

  return {
    level: 0,
    doesExist: false,
  };
};

const sendMail = async (email: string, lastOrder: number, origin: string) => {
  await transporter.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: email,
    subject: 'You Join The Waitlist | redxam',
    html: renderTemplate(email, lastOrder, origin),
    attachments: [facebookIcon, twitterIcon, linkedInIcon, telegramIcon, discordIcon],
  });
};

const createNewUser = async (user: NewUser, wallet: SimpleWallet, level: number) => {
  await User.create({
    accountBalance: 0,
    pending_balance: 0,
    balance: 0,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: '',
    token: '',
    wallet,
    level,
    deposited: 0,
    withdrawn: 0,
    accountStatus: 'pending',
  });
};

export const createWaitlist = async ({ arg }: Argument<NewUser>, req: Request) => {
  const lastOrder = await fetchLastOrder(arg.email);

  try {
    const jobMail = sendMail(arg.email, lastOrder.level, req.headers.origin);
    const jobs: Promise<any>[] = [jobMail];

    if (!lastOrder.doesExist) {
      const wallet = generateWallet();
      const jobCreate = createNewUser(arg, wallet, lastOrder.level + 1);
      jobs.push(jobCreate);
    }

    await Promise.all(jobs);
    return messages.success.register;
  } catch (error) {
    console.error(error.message);
    return messages.failed.general;
  }
};
