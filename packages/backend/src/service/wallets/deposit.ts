require('dotenv').config();
import { REDXAM_ADDRESS } from './consts';
import { createRawTx, broadcastTx } from './index';
import { transporter } from '@/service/emailService';
import blockchain from '../../apis/blockchain';

const { SERVICE_EMAIL } = process.env;

export const deposit = async (
  txsList,
  wallet,
  BALANCE_THRESHOLD,
  TX_FEE,
  isNode = false,
) => {
  const unspentInfo = await getUnspentInfo(txsList, wallet.address, isNode);

  if (unspentInfo.balance - TX_FEE > BALANCE_THRESHOLD) {
    await transporter.sendMail({
      from: `redxam.com <${SERVICE_EMAIL}>`,
      to: 'events.bitcoindeposits@redxam.com',
      subject: 'User balancer surpass threshold',
      html: `User: ${wallet.userId} has surpass the threshold: ${BALANCE_THRESHOLD} whit balance: ${unspentInfo.balance}`,
    });

    // const { txHash } = createRawTx(
    //   {
    //     senderWIF: wallet.wif,
    //     receiverAddress: REDXAM_ADDRESS,
    //   },
    //   unspentInfo.outputs,
    // );
    // const returnedHash = await broadcastTx(txHash);
    // if (returnedHash.context.code === 200) {
    //   console.log(
    //     'Transaction result()()())()()()())()()()()()()()()()()()()()()()()()()()()()()()(): ',
    //     returnedHash.data.transaction_hash,
    //   );
    // } else {
    //   console.log('Error in broadcast');
    //   console.log(returnedHash.context.code, returnedHash.context);
    // }
  }
};

const getUnspentInfo = async (txList, address, isNode) => {
  return isNode ? getUnspentInfoNode(address) : getUnspentInfoBlockchair(txList, address);
};

const getUnspentInfoBlockchair = (txList, address) => {
  // TODO: filter used ones
  const unspentOutputs = txList
    .map(tx => tx.outputs)
    .flat(1)
    .filter(tx => tx.is_spent === false && tx.recipient === address && tx.block_id > -1)
    .map((tx: any) => ({
      value: tx.value,
      txIndex: tx.index,
      txHash: tx.transaction_hash,
    }));

  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  const unspentBalance = unspentOutputs.reduce((prev, curr) => (prev += curr.value), 0);
  return { outputs: unspentOutputs, balance: unspentBalance };
};

const getUnspentInfoNode = async address => {
  const outputs = (await blockchain.getAddressUtxo(address)).filter(
    tx => tx.recipient === address && tx.block_id > -1,
  );
  const unspentBalance = outputs.reduce((prev, curr) => (prev += curr.value), 0);
  return { outputs, balance: unspentBalance };
};
