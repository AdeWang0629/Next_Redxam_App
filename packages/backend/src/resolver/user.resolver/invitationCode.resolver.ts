import { Request } from 'express';
import { JWT } from '@/config/jwt';
import { User } from '@/database';
import { sendWaitlistMail } from '../share/userCreate';

export const invitationCode = async (
  { code }: { code: string },
  req: Request
) => {
  console.debug('[Resolver] invitationCode called');

  try {
    const user = await User.findOne({ invitationCode: code });
    if (!user) {
      return {
        success: false,
        message: 'no invitation code found'
      };
    }
    await sendWaitlistMail(
      user.email,
      user.level,
      req.headers.origin,
      user.waitlistToken,
      user.referralCode
    );
    const token = new JWT({ userId: user._id, type: 'verified' }).signSync();
    await user.updateOne({
      $set: {
        invitationAccepted: true,
        accountStatus: 'accepted',
        token,
        verification: true
      }
    });
    return {
      success: true,
      message: 'user invited sucessfully'
    };
  } catch (error) {
    return { message: error.message, success: false };
  }
};
