import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { User, Admin } from '@/database';
import { generateWallets } from '@/service/wallets';
import sendGrid from '@/apis/sendgrid/index';
import { messages } from '@/config/messages';
import { sanitize, isValidEmail } from '@/utils/helpers';
import { Argument, NewUser } from '../types';
import getAuthorizationToken from '../getAuthorizationToken';

interface adminToken {
  adminId: string;
}

const { SERVICE_EMAIL, TOKEN_SECURITY_KEY } = process.env;

const templatePath = resolve(__dirname, '../../emails/invitation.hjs');
const templateData = readFileSync(templatePath, 'utf-8');
const templateReferralPath = resolve(
  __dirname,
  '../../emails/referralEmail.hjs'
);
const templateReferralData = readFileSync(templateReferralPath, 'utf-8');

const renderTemplate = (
  email: string,
  origin: string,
  invitationCode: string
) => {
  return render(templateData, {
    origin,
    email,
    invitationCode,
    randomText: `Ref #: ${Date.now()}`
  });
};

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@invitation',
  disposition: 'inline'
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@invitation',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@invitation',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@invitation',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@invitation',
  disposition: 'inline'
});

const fetchLastOrder = async (email: string) => {
  const userByEmail = await User.findOne(
    { email },
    { _id: 0, level: 1, referralCode: 1, waitlistToken: 1 }
  )
    .lean()
    .exec();

  if (userByEmail)
    return {
      level: userByEmail.level,
      referralCode: userByEmail.referralCode,
      waitlistToken: userByEmail.waitlistToken,
      doesExist: true
    };

  const userByLevel = await User.findOne({}, { _id: 0, level: 1 })
    .sort({ level: -1 })
    .lean()
    .exec();

  if (userByLevel)
    return {
      level: userByLevel.level,
      doesExist: false
    };

  return {
    level: 0,
    doesExist: false
  };
};

const sendMail = async (
  email: string,
  origin: string,
  invitationCode: string
) => {
  await sendGrid.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: email,
    subject: 'You Joined The Waitlist | redxam',
    html: renderTemplate(email, origin, invitationCode),
    attachments: [
      facebookIcon,
      twitterIcon,
      linkedInIcon,
      telegramIcon,
      discordIcon
    ]
  });
};

const sendReferralMail = async referral => {
  await sendGrid.sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: referral.email,
    subject: 'Someone has used your referral code!',
    html: render(templateReferralData, {
      newLevel: referral.newLevel
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

const createNewUser = async (
  user: NewUser,
  level: number,
  waitlistToken: string,
  referralCode: string,
  referralId: string,
  invitationCode: string
) => {
  await User.create({
    accountBalance: 0,
    pending_balance: 0,
    balance: 0,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email.toLowerCase(),
    phone: '',
    token: '',
    level,
    deposited: 0,
    withdrawn: 0,
    accountStatus: 'pending',
    waitlistToken,
    referralCode,
    referralId,
    wallets: generateWallets(),
    invitationCode,
    invitationAccepted: false
  });
};

const getNewLevel = level => {
  let newLevel = 0;

  const advance = Math.round(level * 0.1);
  if (level === 1) newLevel = level;
  else if (!advance) newLevel = level - 1;
  else {
    newLevel = level - advance;
  }
  return newLevel;
};

const getReferralUser = async referralCode => {
  const referral = await User.findOne(
    { referralCode },
    { _id: 1, referralCode: 1, email: 1, level: 1 }
  );
  if (!referral) return null;
  const newLevel = getNewLevel(referral.level);
  return { ...referral.toObject(), newLevel };
};

const getIntervalUsers = async referral => {
  return User.find(
    {
      level: {
        $lt: referral.level,
        $gte: referral.newLevel
      }
    },
    { _id: 1, level: 1 }
  );
};

const updateUsersLevels = async (referral, intervalUsers) => {
  for (const user of intervalUsers) {
    await user.updateOne({ $set: { level: user.level + 1 } });
  }
  await User.updateOne(
    { _id: referral._id },
    { $set: { level: referral.newLevel } }
  );
};

const handleReferral = async referralCode => {
  const referral = await getReferralUser(referralCode);
  if (!referral)
    return { success: false, message: 'referral code does not exist' };

  const intervalUsers = await getIntervalUsers(referral);
  await updateUsersLevels(referral, intervalUsers);
  await sendReferralMail(referral);
  return { success: true, referralId: referral._id };
};

export const inviteUser = async ({ arg }: Argument<NewUser>, req: Request) => {
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };

  const form = sanitize(arg);
  if (!isValidEmail(form.email)) return messages.failed.invalidEmail;

  const lastOrder = await fetchLastOrder(form.email);

  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;
    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };

    const jobs: Promise<any>[] = [];
    let referralId = null;
    if (!lastOrder.doesExist) {
      if (form.referralCode) {
        if (form.referralCode === 'FWLAUNCHPARTY2022') {
          referralId = 'FWLAUNCHPARTY2022';
        } else {
          const referralStatus = await handleReferral(form.referralCode);
          if (!referralStatus.success) return referralStatus;
          referralId = referralStatus.referralId;
        }
      }
      const waitlistToken = crypto.randomBytes(8).toString('hex');
      const referralCode = crypto.randomBytes(4).toString('hex');
      const invitationCode = crypto.randomBytes(4).toString('hex');

      const jobCreate = createNewUser(
        form,
        lastOrder.level + 1,
        waitlistToken,
        referralCode,
        referralId,
        invitationCode
      );
      jobs.push(jobCreate);

      const jobMail = sendMail(form.email, req.headers.origin, invitationCode);

      jobs.push(jobMail);
    } else {
      return messages.failed.existed;
    }

    await Promise.all(jobs);

    return messages.success.register;
  } catch (error) {
    console.error(error.message);
    return messages.failed.general;
  }
};
