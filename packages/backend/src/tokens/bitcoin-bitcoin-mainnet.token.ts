import WAValidator from 'trezor-address-validator';
import { ECPair, payments, networks, TransactionBuilder } from 'bitcoinjs-lib';
import * as Sentry from '@sentry/node';
import {
  sendPendingTxEmail,
  sendConfirmedTxEmail,
  emailStatus,
  sendBalanceSurpassThreshold,
} from '@/apis/sendgrid';
import blockchain from '@/apis/blockchain';
import {
  User,
  Deposits,
  InternalDeposits,
  DepositsType,
  UserProps,
  DepositsProps,
} from '@/database';
import {
  Token,
  Wallet,
  UserWallet,
  Transaction,
  Deposit,
  DepositStatus,
  UnspentInfo,
  TxData,
} from './token';
import { BTC_BALANCE_THRESHOLD, BTC_TX_FEE, REDXAM_ADDRESS } from './consts';

export class BitcoinBitcoinMainnetToken implements Token {
  readonly name = 'Bitcoin';

  readonly symbol = 'BTC';

  readonly network = 'Bitcoin';

  readonly isTestNet = false;

  readonly txFee = BTC_TX_FEE;

  readonly threshold = BTC_BALANCE_THRESHOLD;

  createWallet(): Wallet {
    const network = networks['bitcoin'];
    const keyPair = ECPair.makeRandom({ network });
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network });
    const wif = keyPair.toWIF();
    return { address, wif, txsCount: 0, hasPendingTxs: false };
  }

  validateAddress(address: string): boolean {
    return WAValidator.validate(address, this.symbol);
  }

  async getBalance(address: string): Promise<number> {
    const balance = await blockchain.getAddressBalance(address);
    return balance;
  }

  async getWallets(): Promise<UserWallet[]> {
    return (
      await User.find(
        { wallets: { $exists: true }, verification: true, accountStatus: 'accepted' },
        { _id: 1, 'wallets.BTC': 1 },
      )
    ).map(user => ({ userId: user._id, wallet: user.wallets.BTC }));
  }

  async getWalletTxs(address: string): Promise<Transaction[]> {
    const res = await blockchain.getTxByAddress(address);
    if (res.status === 200) {
      return res.txs.map(tx => ({
        blockId: tx.height,
        hash: tx.hash,
        outputs: tx.outputs,
      }));
    } else {
      Sentry.captureException(res.error);
      return [];
    }
  }

  getWalletDeposits(txs: Transaction[], address: string): Deposit[] {
    const userTxs: Deposit[] = [];

    txs.forEach(tx => {
      const outputs = tx.outputs.filter(output => output.address === address);
      outputs.forEach((out, index) =>
        userTxs.push({
          blockId: tx.blockId,
          value: out.value,
          index,
          hash: tx.hash,
        }),
      );
    });

    return userTxs;
  }

  hasWalletNewTxs(wallet: UserWallet, txs: Transaction[]): boolean {
    return txs.length > wallet.wallet.txsCount || wallet.wallet.hasPendingTxs;
  }

  async updateWalletDeposits(deposits: Deposit[], wallet: UserWallet): Promise<void> {
    let hasPendingTxs = false;

    for (const deposit of deposits) {
      const status = deposit.blockId > 0 ? 'completed' : 'pending';
      if (deposit.blockId === -1) hasPendingTxs = true;
      await this.depositConfirmationMailing(deposit, wallet.userId);
      await Deposits.updateOne(
        { userId: wallet.userId, hash: deposit.hash },
        {
          $set: {
            userId: wallet.userId,
            address: wallet.wallet.address,
            index: deposit.index,
            type: DepositsType.CRYPTO,
            currency: this.symbol,
            processedByRedxam: false,
            hash: deposit.hash,
            amount: deposit.value,
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
        _id: wallet.userId,
      },
      {
        $set: { hasPendingTxs, 'wallet.txsCount': deposits.length },
      },
    );
  }

  isPendingDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return status === 'pending' && !deposit;
  }

  isConfirmedDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return status === 'completed' && deposit && deposit.status === 'pending';
  }

  isCofirmedDepositWithoutPending(status: DepositStatus, deposit: DepositsProps): boolean {
    return status === 'completed' && !deposit;
  }

  async getUser(userId: string): Promise<UserProps> {
    return User.findOne({ _id: userId });
  }

  async depositConfirmationMailing(deposit: Deposit, userId: string): Promise<emailStatus> {
    const status = deposit.blockId > 0 ? 'completed' : 'pending';
    const dbDeposit = await Deposits.findOne({ hash: deposit.hash });
    if (this.isPendingDeposit(status, dbDeposit)) {
      const user = await this.getUser(userId);
      return sendPendingTxEmail(user, this.symbol, deposit.value);
    } else if (this.isConfirmedDeposit(status, dbDeposit)) {
      const user = await this.getUser(userId);
      return sendConfirmedTxEmail(user, this.symbol, deposit.value);
    } else if (this.isCofirmedDepositWithoutPending(status, dbDeposit)) {
      const user = await this.getUser(userId);
      return sendConfirmedTxEmail(user, this.symbol, deposit.value);
    }
  }

  async getUnspentInfo(txs: Transaction[], wallet: UserWallet): Promise<UnspentInfo> {
    const outputs = await blockchain.getAddressUtxo(wallet.wallet.address);
    const unspentBalance = outputs
      .filter(({ height }) => height > 0)
      .reduce((prev, curr) => prev += curr.value, 0);
    return { outputs, balance: unspentBalance };
  }

  createRawTx(txData: TxData, unspentInfo: UnspentInfo): { hash: string } {
    const network = networks['testnet'];
    const { senderWIF, receiverAddress } = txData;
    const { outputs } = unspentInfo;

    var txb = new TransactionBuilder(network);

    let inputBalance = 0;

    outputs.forEach(tx => {
      const { hash, index, value } = tx;
      txb.addInput(hash, index);
      inputBalance += value;
    });

    // output is our Binance wallet
    txb.addOutput(receiverAddress, inputBalance - this.txFee);

    // sign with sender WIF (private key in WIF format)
    let wif = senderWIF;
    let keyPairSpend = ECPair.fromWIF(wif, network);

    outputs.forEach((tx, idx) => {
      txb.sign(idx, keyPairSpend);
    });

    //   print tx hex
    let txHex = txb.build().toHex();

    return { hash: txHex };
  }

  async handleThreshold(unspentInfo: UnspentInfo, wallet: UserWallet): Promise<void> {
    if (unspentInfo.balance - this.txFee > this.threshold) {
      try {
        const { hash } = this.createRawTx(
          {
            senderWIF: wallet.wallet.wif,
            receiverAddress: REDXAM_ADDRESS,
          },
          unspentInfo,
        );

        const txData = await blockchain.broadcastTx(hash);

        if (txData.status === 200) {
          await sendBalanceSurpassThreshold(
            wallet.userId,
            this.threshold,
            unspentInfo.balance,
            txData.data.result,
            this.symbol,
          );

          await InternalDeposits.create({
            amount: unspentInfo.balance - this.txFee,
            hash: txData.data.result,
            userId: wallet.userId,
            address: wallet.wallet.address,
            timestamp: new Date().getTime(),
          });
          console.debug(`TxHash: ${txData.data.result}`);
        } else {
          throw txData.data.error;
        }
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    }
  }

  // Methods not defined in the interface should be private
  private someBitcoinMethod(): void {
    // ...
  }
}
