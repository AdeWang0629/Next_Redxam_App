import { Request } from 'express';
import { messages } from '@/config/messages';
import { sanitize, isValidEmail } from '@/utils/helpers';
import userCreate from '../share/userCreate';
import { Argument, NewUser } from '../types';

export const createWaitlist = async (
  { arg }: Argument<NewUser>,
  req: Request
) => {
  const form = sanitize(arg);
  if (!isValidEmail(form.email)) return messages.failed.invalidEmail;

  const lastOrder = await userCreate.fetchLastOrder(form.email);

  try {
    let level = 0;
    let userReferralCode = '';

    const jobs: Promise<any>[] = [];

    let referralId = null;
    if (!lastOrder.doesExist) {
      const referral = await userCreate.handleReferral(form.referralCode);
      if (!referral.success) return referral;

      const { waitlistToken, referralCode } = userCreate.createUserCodes();

      level = lastOrder.level + 1;
      userReferralCode = referralCode;

      const jobCreate = userCreate.createNewUser(
        form,
        level,
        waitlistToken,
        referralCode,
        referralId
      );
      jobs.push(jobCreate);

      const jobMail = userCreate.sendWaitlistMail(
        form.email,
        level,
        req.headers.origin,
        waitlistToken,
        referralCode,
        req.headers.origin.includes('redxam.ae') ||
          req.headers.referer.includes('/ar/') ||
          req.headers.referer.endsWith('/ar') ||
          req.headers.currenturl.includes('/ar/') ||
          (req.headers.currenturl as string).endsWith('/ar')
          ? 'ar'
          : 'en'
      );

      jobs.push(jobMail);
    } else {
      level = lastOrder.level;
      userReferralCode = lastOrder.referralCode;
      const jobMail = userCreate.sendWaitlistMail(
        form.email,
        level,
        req.headers.origin,
        lastOrder.waitlistToken,
        lastOrder.referralCode,
        req.headers.origin.includes('redxam.ae') ||
          req.headers.referer.includes('/ar/') ||
          req.headers.referer.endsWith('/ar') ||
          req.headers.currenturl.includes('/ar/') ||
          (req.headers.currenturl as string).endsWith('/ar')
          ? 'ar'
          : 'en'
      );

      jobs.push(jobMail);
    }

    await Promise.all(jobs);

    return {
      ...messages.success.register,
      level,
      referralCode: userReferralCode
    };
  } catch (error) {
    console.error(error.message);
    return messages.failed.general;
  }
};
