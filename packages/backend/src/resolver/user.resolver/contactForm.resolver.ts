import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { Attachment } from 'nodemailer/lib/mailer';
import { Request } from 'express';
import { isValidEmail } from '@/utils/helpers';
import { sendMail } from '@/apis/sendgrid/index';
import { Argument } from '../types';

const { SERVICE_EMAIL } = process.env;

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}

export const contactForm = async ({ arg }: Argument<FormData>) => {
  const validation = validateForm(arg);
  if (!validation.isValid) return validation.res;
  try {
    const userEmail = await sendUserEmail(arg.email);
    const redxamEmail = await sendRedxamEmail(arg);
    return { success: true, message: 'contact send succesfully', userEmail, redxamEmail };
  } catch (error) {
    return { message: error.message, success: false };
  }
};

const validateForm = (
  form: FormData,
): { isValid: boolean; res?: { success: boolean; message: string } } => {
  if (!form.email || !form.question) {
    return {
      isValid: false,
      res: { success: false, message: 'please fill the required fields' },
    };
  }
  if (form.email.length < 1 || form.question.length < 1) {
    return {
      isValid: false,
      res: { success: false, message: 'please fill the required fields' },
    };
  }
  if (!isValidEmail(form.email)) {
    return {
      isValid: false,
      res: { success: false, message: 'email is not valid' },
    };
  }
  return { isValid: true };
};

const sendUserEmail = async (email: string) =>
  sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: email,
    subject: 'Your question was sent succesfully',
    attachments: [facebookIcon, twitterIcon, linkedInIcon, telegramIcon, discordIcon],
    html: render(templateData, {}),
  });

const sendRedxamEmail = async (form: FormData) =>
  sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: 'support@redxam.com',
    subject: 'contact form question',
    html: `
        ${form.firstName} ${form.lastName} has the following question:
        ${form.question}
        Answer to email: ${form.email}
    `,
  });

const templatePath = resolve(__dirname, '../../emails/contactFormUser.hjs');
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
