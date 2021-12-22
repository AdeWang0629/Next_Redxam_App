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
import { admin } from '../admin.resolver/admin.resolver';
import { Argument, NewUser } from '../types';

const { SERVICE_EMAIL } = process.env;

const templatePath = resolve(__dirname, '../../emails/simplewaitlist.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

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

const checkUserExists = async (user: NewUser) => {
  const { email, phone } = user;
  let query = [];

  if (email) query.push({ email });
  if (phone) query.push({ phone });

  return User.exists({ $or: query });
};

const getLastOrder = async () => {
  const user = await User.findOne({}, { _id: 0, level: 1 })
    .sort({ level: -1 })
    .lean()
    .exec();

  return user?.level ?? 0;
};

const sendMail = async (email: string, lastOrder: number) => {
  const renderedTemplate = render(templateData, {
    lastOrder,
    randomText: `Ref #: ${Date.now()}`,
  });

  await transporter.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: email,
    subject: 'You Join The Waitlist | redxam',
    html: renderedTemplate,
    attachments: [facebookIcon, twitterIcon, linkedInIcon, telegramIcon, discordIcon],
  });
};

const createNewUser = async (user: NewUser, wallet: SimpleWallet, level: number) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    birthPlace,
    title,
    address,
    nearestLandmark,
    state,
    marriedStatus,
    occupation,
    identityIDType,
    identityIDNumber,
    issuance,
    issuancePlace,
    issuanceDate,
    issuanceStatus,
    expiringDate,
  } = user;
  await User.create({
    firstName,
    lastName,
    pending_balance: 0,
    accountBalance: 0,
    balance: 0,
    email,
    phone,
    wallet,
    level,
    token: '',
    deposited: 0,
    withdrawn: 0,
    accountStatus: 'pending',
    birthPlace,
    title,
    address,
    nearestLandmark,
    state,
    marriedStatus,
    occupation,
    identityIDType,
    identityIDNumber,
    issuance,
    issuancePlace,
    issuanceDate,
    issuanceStatus,
    expiringDate,
  });
};

export const createUser = async ({ arg }: Argument<NewUser>, req: Request) => {
  console.debug('[Resolver] createUser called');

  const adminInfo = await admin(null, req);
  // @ts-expect-error
  if (adminInfo?.err) return adminInfo?.err;

  if (await checkUserExists(arg)) {
    return messages.failed.existed;
  }

  try {
    const wallet = generateWallet();
    const lastOrder = await getLastOrder();

    const jobSend = sendMail(arg.email, lastOrder);
    const jobCreate = createNewUser(arg, wallet, lastOrder + 1);

    await Promise.all([jobSend, jobCreate]);
    return messages.success.register;
  } catch (err) {
    console.log(err);
    return messages.failed.general;
  }
};
