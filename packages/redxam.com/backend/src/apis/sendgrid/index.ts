import sgMail from '@sendgrid/mail';
import { transporter } from '@/service/emailService';
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

export interface emailStatus {
  message: string;
  status: number;
}

export const sendPendingTxEmail = async (
  user: emailUser,
  currency: Currency,
  value: number
): Promise<emailStatus> => {
  try {
    const email = await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: user.email,
      subject: 'Your redxam deposits is being processing in the blockchain',
      html: `${user.firstName} your deposit to redxam for a value of 
      ${value} ${currency} is being proccesed in the blockchain,
       we will send you another email when payment is confirmed`
    });
    return { status: email[0].statusCode, message: 'pending tx email sent' };
  } catch (error) {
    return error.message;
  }
};

export const sendConfirmedTxEmail = async (
  user: emailUser,
  currency: Currency,
  value: number
): Promise<emailStatus> => {
  try {
    const email = await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: user.email,
      subject: 'Your redxam deposits is confirmed by the blockchain',
      html: `${user.firstName} your deposit to redxam for a value of 
      ${value} ${currency} has being confirmed by the blockchain, 
      once we also confirme the payment you can start earning with us!`
    });
    return { status: email[0].statusCode, message: 'confirmed tx email sent' };
  } catch (error) {
    return error.message;
  }
};

export const sendBalanceSurpassThreshold = async (
  userId: string,
  threshold: number,
  balance: number,
  hash: string,
  symbol: string
): Promise<void> => {
  try {
    await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: 'events.bitcoindeposits@redxam.com',
      subject: 'User balancer surpass threshold',
      html: `User: ${userId} has surpass the ${symbol} 
      threshold: ${threshold}${symbol} whit balance: ${balance}${symbol}
      a deposit has been made to the binance address with txHash: ${hash}`
    });
  } catch (error) {
    return error.message;
  }
};

export default {
  sendMail,
  sendPendingTxEmail
};
