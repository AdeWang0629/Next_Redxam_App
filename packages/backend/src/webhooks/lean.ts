import { User, Transactions, TransactionTypes, DepositsType } from '@/database';
import { sendMail } from '@/apis/sendgrid';

const { SERVICE_EMAIL } = process.env;

const leanWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (
      data.type === 'payment_source.created' ||
      data.type === 'payment_source.updated'
    ) {
      if (data.payload.status === 'ACTIVE') {
        const user = await User.findOne(
          { leanCustomerId: data.payload.customer_id },
          { email: 1 }
        );
        await sendMail({
          from: `redxam.com <${SERVICE_EMAIL}>`,
          to: user.email,
          subject: 'Your linked account to redxam is now active',
          text: 'You can now proceed to deposit to redxam and start earning!'
        });
      }
    } else if (data.type === 'payment.created') {
      const user = await User.findOne(
        { leanCustomerId: data.payload.customer_id },
        { email: 1 }
      );

      if (data.payload.status === 'PENDING_WITH_BANK') {
        await sendMail({
          from: `redxam.com <${SERVICE_EMAIL}>`,
          to: user.email,
          subject: 'Your deposit is being proccesed',
          text: `Your deposit at redxam for a value of ${
            data.payload.amount + data.payload.currency
          } is being proccesed for the bank, we will send you another email when banks confirm it.`
        });
      } else if (data.payload.status === 'ACCEPTED_BY_BANK') {
        await Transactions.create({
          type: DepositsType.FIAT,
          currency: data.payload.currency,
          direction: TransactionTypes.DEPOSIT,
          amount: data.payload.amount,
          processedByRedxam: false,
          userId: user._id,
          status: 'pending',
          stripeChargeId: data.payload.bank_transaction_reference,
          timestamp: Date.now()
        });

        await sendMail({
          from: `redxam.com <${SERVICE_EMAIL}>`,
          to: user.email,
          subject: 'Your deposit was confirmed by the bank',
          text: `Your deposit for a value of ${
            data.payload.amount + data.payload.currency
          } was proccesed for your bank entity, you will see the amount reflected in your account once we confirmed the payment. thanks for trust Redxam.`
        });
      }
    }
    res.status(200);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default leanWebhook;
