import sgMail from '@sendgrid/mail';
import { Currency } from '@/database/types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { SERVICE_EMAIL } = process.env;

export const sendMail = msg => {
  return sgMail.send(msg);
};

export interface emailUser {
  firstName: string;
  email: string;
}

export const sendPendingTxEmail = async (
  user: emailUser,
  currency: Currency,
  value: number,
) => {
  const email = await sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: user.email,
    subject: 'Your redxam deposits is being processing in the blockchain',
    html: `${user.firstName} your deposit to redxam for a value of ${
      value * 0.00000001
    } ${currency} is being proccesed in the blockchain, we will send you another email when payment is confirmed`,
  });
  return { status: email[0].statusCode, message: 'pending tx email sent' };
};

export const sendConfirmedTxEmail = async (
  user: emailUser,
  currency: Currency,
  value: number,
) => {
  const email = await sendMail({
    from: `redxam.com <${SERVICE_EMAIL}>`,
    to: user.email,
    subject: 'Your redxam deposits is confirmed',
    html: `${user.firstName} your deposit to redxam for a value of ${
      value * 0.00000001
    } ${currency} has being confirmed`,
  });
  return { status: email[0].statusCode, message: 'confirmed tx email sent' };
};

export default {
  sendMail,
  sendPendingTxEmail,
};
