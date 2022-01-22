const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async msg => {
  return sgMail.send(msg);
};

export default {
  sendMail,
};
