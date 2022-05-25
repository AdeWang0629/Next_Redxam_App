import { Request } from 'express';
import { messages } from '@/config/messages';
import { sanitize, isValidEmail } from '@/utils/helpers';
import { isValidAdmin } from './adminHelpers';
import userCreate from '../share/userCreate';
import { getLanguage } from '../share/getLanguage';
import { User, UserProps } from '@/database';
import { Argument, NewUser } from '../types';

export const inviteUser = async ({ arg }: Argument<NewUser>, req: Request) => {
  try {
    const auth = await isValidAdmin(req.headers.authorization);
    if (!auth.success) return auth;

    const form = sanitize(arg);
    if (!isValidEmail(form.email)) return messages.failed.invalidEmail;

    const user: UserProps = await User.findOne({ email: form.email });

    if (user) {
      return { message: 'This user already exist', success: false };
    }

    const lastOrder = await userCreate.fetchLastOrder(form.email);
    const jobs: Promise<any>[] = [];

    if (!lastOrder.doesExist) {
      const referral = await userCreate.handleReferral(form.referralCode);
      if (!referral.success) return referral;

      const { waitlistToken, referralCode, invitationCode } =
        userCreate.createUserCodes();

      const jobCreate = userCreate.createNewUser(
        form,
        lastOrder.level + 1,
        waitlistToken,
        referralCode,
        referral.id,
        invitationCode
      );

      const jobMail = userCreate.sendInvitationEmail(
        form.email,
        req.headers.origin,
        invitationCode,
        getLanguage(req)
      );

      jobs.push(jobCreate);
      jobs.push(jobMail);
    } else {
      const jobMail = userCreate.sendInvitationEmail(
        form.email,
        req.headers.origin,
        lastOrder.invitationCode,
        getLanguage(req)
      );
      jobs.push(jobMail);
    }

    await Promise.all(jobs);
    return messages.success.register;
  } catch (error) {
    return messages.failed.general;
  }
};
