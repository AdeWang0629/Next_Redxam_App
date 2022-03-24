import crypto from 'crypto';
import { User } from '@/database';
import { generateWallets } from '@/service/wallets';
import { sendUserEmail } from './UserEmail';
import { NewUser } from '../types';

export const fetchLastOrder = async (email: string) => {
  const userByEmail = await User.findOne(
    { email },
    { _id: 0, level: 1, referralCode: 1, waitlistToken: 1, invitationCode: 1 }
  )
    .lean()
    .exec();

  if (userByEmail)
    return {
      level: userByEmail.level,
      referralCode: userByEmail.referralCode,
      waitlistToken: userByEmail.waitlistToken,
      invitationCode: userByEmail.invitationCode,
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

export const createUserCodes = () => {
  const waitlistToken = crypto.randomBytes(8).toString('hex');
  const referralCode = crypto.randomBytes(4).toString('hex');
  const invitationCode = crypto.randomBytes(4).toString('hex');
  return { waitlistToken, referralCode, invitationCode };
};

export const createNewUser = async (
  user: NewUser,
  level: number,
  waitlistToken: string,
  referralCode: string,
  referralId: string,
  invitationCode?: string
) => {
  await User.create({
    accountBalance: 0,
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

export const signupUser = async (user: NewUser) => {
  return User.create({
    accountBalance: 0,
    balance: 0,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email.toLowerCase(),
    phone: '',
    token: '',
    deposited: 0,
    withdrawn: 0,
    accountStatus: 'accepted',
    wallets: generateWallets()
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

const updateReferrals = async referralCode => {
  const referral = await getReferralUser(referralCode);
  if (!referral)
    return { success: false, message: 'referral code does not exist' };

  const intervalUsers = await getIntervalUsers(referral);
  await updateUsersLevels(referral, intervalUsers);
  await sendUserEmail(__dirname, '../../emails/referralEmail.hjs', {
    ...referral,
    subject: 'Someone has used your referral code!'
  });

  return { success: true, referralId: referral._id };
};

interface ReferralStatus {
  id: string;
  message?: string;
  success: boolean;
}

export const handleReferral = async (
  referralCode: string
): Promise<ReferralStatus> => {
  let referralId = null;
  if (referralCode) {
    if (referralCode === 'FWLAUNCHPARTY2022') {
      referralId = 'FWLAUNCHPARTY2022';
    } else {
      const referralStatus = await updateReferrals(referralCode);
      if (!referralStatus.success) return { ...referralStatus, id: null };
      referralId = referralStatus.referralId;
    }
  }
  return { success: true, id: referralId };
};

export const sendWaitlistMail = async (
  email: string,
  lastOrder: number,
  origin: string,
  waitlistToken: string,
  referralCode: string
) => {
  await sendUserEmail(__dirname, '../../emails/simplewaitlist.hjs', {
    origin,
    lastOrder,
    email,
    waitlistToken,
    referralCode,
    subject: 'You Joined The Waitlist | redxam'
  });
};

export const sendSignupMail = async (email: string, loginUrl: string) => {
  await sendUserEmail(__dirname, '../../emails/signup.hjs', {
    email,
    subject: 'You Joined redxam',
    loginUrl
  });
};

export const sendInvitationEmail = async (
  email: string,
  origin: string,
  invitationCode: string
) => {
  await sendUserEmail(__dirname, '../../emails/invitation.hjs', {
    email,
    origin,
    invitationCode,
    subject: 'You have been invited to join Redxam!'
  });
};

export default {
  fetchLastOrder,
  createUserCodes,
  createNewUser,
  handleReferral,
  sendWaitlistMail,
  sendInvitationEmail,
  signupUser,
  sendSignupMail
};
