import crypto from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Attachment } from 'nodemailer/lib/mailer';
import { Admin, User } from '@/database';
import { sendMail } from '@/apis/sendgrid';
import getAuthorizationToken from './getAuthorizationToken';

const { SERVICE_EMAIL, TOKEN_SECURITY_KEY } = process.env;

interface adminToken {
  adminId: string;
}

interface UpdateReferral {
  success: boolean;
  message: string;
  updatedUsers?: UpdatedUsers[];
  amount?: number;
}

interface UpdatedUsers {
  userId: string;
  waitlistToken: string;
  referralCode: string;
}

export const updateReferral = async (_: void, req: Request): Promise<UpdateReferral> => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };
  console.debug('si pase');
  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;
    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };

    const updatedUsers: UpdatedUsers[] = await updateReferralScript(req.headers.origin);

    return {
      success: true,
      message: 'users referrals updated sucessfully',
      updatedUsers,
      amount: updatedUsers.length,
    };
  } catch (err) {
    return { message: err.message, success: false };
  }
};

const updateReferralScript = async (origin): Promise<UpdatedUsers[]> => {
  let updatedUsers: UpdatedUsers[] = [];
  const users = await User.find({});
  for (const user of users) {
    if (!user.referralCode || !user.waitlistToken) {
      const waitlistToken = crypto.randomBytes(8).toString('hex');
      const referralCode = crypto.randomBytes(4).toString('hex');
      await user.updateOne({
        $set: {
          waitlistToken,
          referralCode,
        },
      });
      await sendMail({
        from: `redxam.com <${SERVICE_EMAIL}>`,
        to: user.email,
        subject: 'Your redxam deposits is being processing in the blockchain',
        html: render(templateData, {
          origin,
          lastOrder: user.level,
          email: user.email,
          waitlistToken,
          referralCode,
          randomText: `Ref #: ${Date.now()}`,
        }),
      });
      updatedUsers.push({ userId: user._id, waitlistToken, referralCode });
    }
  }
  return updatedUsers;
};

const templatePath = resolve(__dirname, '../../emails/simplewaitlist.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../../emails/facebook.png`).toString('base64'),
  content_id: 'facebook@waitlist',
  disposition: 'inline',
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../../emails/twitter.png`).toString('base64'),
  content_id: 'twitter@waitlist',
  disposition: 'inline',
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../../emails/linkedin.png`).toString('base64'),
  content_id: 'linkedin@waitlist',
  disposition: 'inline',
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../../emails/telegram.png`).toString('base64'),
  content_id: 'telegram@waitlist',
  disposition: 'inline',
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../../emails/discord.png`).toString('base64'),
  content_id: 'discord@waitlist',
  disposition: 'inline',
});
