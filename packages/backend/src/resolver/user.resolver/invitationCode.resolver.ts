import { User } from '@/database';
import { Request } from 'express';
import { sendMail } from '../referral.resolver/createWaitlist.resolver';

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
    await sendMail(
      user.email,
      user.level,
      req.headers.origin,
      user.waitlistToken,
      user.referralCode
    );

    await user.updateOne({
      $set: { invitationAccepted: true, accountStatus: 'accepted' }
    });
    return {
      success: true,
      message: 'user invited sucessfully'
    };
  } catch (error) {
    return { message: error.message, success: false };
  }
};
