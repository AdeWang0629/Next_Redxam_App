import { Request } from 'express';
import { messages } from '@/config/messages';
import { sanitize, isValidEmail } from '@/utils/helpers';
import userCreate from '../share/userCreate';
import { Argument, NewUser } from '../types';

export const createUser = async ({ arg }: Argument<NewUser>, req: Request) => {
  const form = sanitize(arg);
  if (!isValidEmail(form.email)) return messages.failed.invalidEmail;

  try {
    const jobs: Promise<any>[] = [];

    const jobCreate = userCreate.signupUser(form);
    jobs.push(jobCreate);

    const jobMail = userCreate.sendSignupMail(form.email);
    jobs.push(jobMail);

    await Promise.all(jobs);

    return messages.success.register;
  } catch (error) {
    console.error(error.message);
    return messages.failed.general;
  }
};
