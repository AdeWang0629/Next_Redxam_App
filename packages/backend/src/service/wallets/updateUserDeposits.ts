import { Deposits, DepositsType, DepositsCurrencyType, User } from '@/database';
import { sendMail } from '@/apis/sendgrid';

const { SERVICE_EMAIL } = process.env;

export const updateUserDeposits = async (txList, currentUserWallet, isNode = false) => {
  if (txList.length > currentUserWallet.txsCount || currentUserWallet.hasPendingTxs) {
    const userTxs = getUserTxList(txList, currentUserWallet.address, isNode);
    let hasPendingTxs = false;

    for (const tx of userTxs) {
      const status = tx.block_id > 0 ? 'completed' : 'pending';
      if (tx.block_id === -1) hasPendingTxs = true;

      await handleMailUser(tx, currentUserWallet.userId);

      await Deposits.updateOne(
        { userId: currentUserWallet.userId, hash: tx.txHash },
        {
          $set: {
            userId: currentUserWallet.userId,
            address: currentUserWallet.address,
            index: tx.txIndex,
            type: DepositsType.CRYPTO,
            currency: DepositsCurrencyType.BTC,
            processedByRedxam: false,
            hash: tx.txHash,
            amount: tx.value,
            status,
          },
          $setOnInsert: {
            timestamp: Date.now(),
          },
        },
        {
          upsert: true,
        },
      );
    }

    await User.updateOne(
      {
        _id: currentUserWallet.userId,
      },
      {
        $set: { hasPendingTxs, 'wallet.txsCount': userTxs.length },
      },
    );
  }
};

const getUserTxList = (transactionsList, address, isNode) => {
  return isNode
    ? getUserTxListNode(transactionsList, address)
    : getUserTxListBlockChair(transactionsList, address);
};

const getUserTxListBlockChair = (transactionsList, address) => {
  console.log(address);
  return transactionsList
    .map(tx => tx.outputs)
    .flat(1)
    .filter(tx => tx.recipient === address)
    .map((tx: any) => ({
      block_id: tx.block_id,
      value: tx.value,
      txIndex: tx.index,
      txHash: tx.transaction_hash,
    }));
};

const getUserTxListNode = (transactionsList, address) => {
  const userTxs = [];

  transactionsList.forEach(tx => {
    const outputs = tx.outputs.filter(output => output.address === address);
    outputs.forEach((out, index) =>
      userTxs.push({
        block_id: tx.height,
        value: out.value,
        txIndex: index,
        txHash: tx.hash,
      }),
    );
  });

  return userTxs;
};

const handleMailUser = async (tx, userId) => {
  const status = tx.block_id > 0 ? 'completed' : 'pending';
  const txDeposit = await Deposits.findOne({ hash: tx.txHash });
  return mailUser(status, txDeposit, tx.value, userId);
};

export const mailUser = async (status, txDeposit, value, userId) => {
  if (status === 'pending' && !txDeposit) {
    const user = await User.findOne({ _id: userId }, { email: 1, firstName: 1 });
    const email = await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: user.email,
      subject: 'Your redxam deposits is being processing in the blockchain',
      html: `Ey ${user.firstName} your deposit to redxam for a value of ${
        value * 0.00000001
      } is being proccesed in the blockchain, we'll send you another email when payment is confirmed`,
    });
    return { status: email[0].statusCode, message: 'pending tx email sent' };
  } else if (status === 'completed' && txDeposit && txDeposit.status === 'pending') {
    const user = await User.findOne({ _id: userId }, { email: 1, firstName: 1 });
    const email = await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: user.email,
      subject: 'Your redxam deposits is confirmed',
      html: `${user.firstName} your deposit to redxam for a value of ${
        value * 0.00000001
      } has being confirmed`,
    });
    return { status: email[0].statusCode, message: 'confirmed tx email sent' };
  } else if (status === 'completed' && !txDeposit) {
    const user = await User.findOne({ _id: userId }, { email: 1, firstName: 1 });
    const email = await sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: user.email,
      subject: 'Your redxam deposits is confirmed',
      html: `${user.firstName} your deposit to redxam for a value of ${
        value * 0.00000001
      } has being confirmed`,
    });
    return { status: email[0].statusCode, message: 'confirmed email sent at once' };
  }
};
