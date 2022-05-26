/* eslint-disable lines-between-class-members */
import WAValidator from 'trezor-address-validator';
import axios from 'axios';
import { ECPair, payments, networks, TransactionBuilder } from 'bitcoinjs-lib';
import * as Sentry from '@sentry/node';
import {
  sendPendingTxEmail,
  sendConfirmedTxEmail,
  emailStatus,
  sendBalanceSurpassThreshold
} from '@/apis/sendgrid';
import blockchain from '@/apis/blockchain';
import {
  User,
  Transactions,
  TransactionsProps,
  TransactionTypes,
  DepositsType,
  UserProps,
  DepositsCurrencyType,
  TransactionStatus
} from '@/database';
import {
  Token,
  Wallet,
  TransactionBTC,
  Deposit,
  DepositStatus,
  UnspentInfo,
  TxData,
  Fiats
} from './token';
import { BTC_BALANCE_THRESHOLD, BTC_TX_FEE, REDXAM_ADDRESS } from './consts';

export class BitcoinBitcoinMainnetToken implements Token {
  readonly name = 'Bitcoin';
  readonly symbol = 'BTC';
  readonly network = 'BTC';
  readonly isTestNet = false;
  readonly txFee = BTC_TX_FEE;
  readonly threshold = BTC_BALANCE_THRESHOLD;
  readonly redxamAddress = REDXAM_ADDRESS;
  createWallet(): Wallet {
    const network = networks[this.isTestNet ? 'testnet' : 'bitcoin'];
    const keyPair = ECPair.makeRandom({ network });
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network });
    const wif = keyPair.toWIF();
    return { address, wif, txsCount: 0, hasPendingTxs: false };
  }
  validateAddress(address: string): boolean {
    return WAValidator.validate(address, 'btc');
  }
  async getBalance(address: string): Promise<number> {
    const balance = await blockchain.getAddressBalance(address, this.isTestNet);
    return balance;
  }
  async getWallets(): Promise<Wallet[]> {
    return (
      await User.find(
        {
          wallets: { $exists: true },
          verification: true,
          accountStatus: 'accepted'
        },
        { _id: 1, 'wallets.BTC': 1 }
      )
    ).map(user => ({
      userId: user._id,
      address: user.wallets.BTC.address,
      txsCount: user.wallets.BTC.txsCount,
      hasPendingTxs: user.wallets.BTC.hasPendingTxs,
      wif: user.wallets.BTC.wif
    }));
  }
  async getWalletTxs(address: string): Promise<TransactionBTC[]> {
    const res = await blockchain.getTxByAddress(address, this.isTestNet);
    if (res.status === 200) {
      return res.txs.map(tx => ({
        blockId: tx.height,
        hash: tx.hash,
        outputs: tx.outputs
      }));
    } else {
      Sentry.captureException(res.error);
      return [];
    }
  }
  getWalletDeposits(txs: TransactionBTC[], address: string): Deposit[] {
    const userTxs: Deposit[] = [];

    txs.forEach(tx => {
      const outputs = tx.outputs.filter(output => output.address === address);
      outputs.forEach((out, index) =>
        userTxs.push({
          blockId: tx.blockId,
          value: out.value,
          index,
          hash: tx.hash
        })
      );
    });

    return userTxs;
  }
  hasWalletNewTxs(wallet: Wallet, txs: Deposit[]): boolean {
    return txs.length > wallet.txsCount || wallet.hasPendingTxs;
  }
  async updateWalletDeposits(
    deposits: Deposit[],
    wallet: Wallet
  ): Promise<void> {
    let hasPendingTxs = false;

    for (const deposit of deposits) {
      if (deposit.blockId === -1) hasPendingTxs = true;
      await this.depositConfirmationMailing(deposit, wallet.userId);
      const updatedDeposit = await Transactions.updateOne(
        { userId: wallet.userId, hash: deposit.hash },
        {
          $setOnInsert: {
            timestamp: Date.now(),
            status: TransactionStatus.PENDING,
            userId: wallet.userId,
            address: wallet.address,
            index: deposit.index,
            type: DepositsType.CRYPTO,
            direction: TransactionTypes.DEPOSIT,
            currency: this.symbol,
            processedByRedxam: false,
            hash: deposit.hash,
            amount: deposit.value,
            network: this.network
          }
        },
        {
          upsert: true
        }
      );
    }

    const currentWallet = `wallets.${this.symbol}`;

    await User.updateOne(
      {
        _id: wallet.userId
      },
      {
        $set: {
          [`${currentWallet}.hasPendingTxs`]: hasPendingTxs,
          [`${currentWallet}.txsCount`]: deposits.length
        }
      }
    );
  }
  isPendingDeposit(status: DepositStatus, deposit: TransactionsProps): boolean {
    return status === TransactionStatus.PENDING && !deposit;
  }
  isConfirmedDeposit(
    status: DepositStatus,
    deposit: TransactionsProps
  ): boolean {
    return (
      status === TransactionStatus.COMPLETED &&
      deposit &&
      deposit.status === TransactionStatus.PENDING
    );
  }
  isCofirmedDepositWithoutPending(
    status: DepositStatus,
    deposit: TransactionsProps
  ): boolean {
    return status === TransactionStatus.COMPLETED && !deposit;
  }
  async getUser(userId: string): Promise<UserProps> {
    return User.findOne({ _id: userId });
  }
  async depositConfirmationMailing(
    deposit: Deposit,
    userId: string
  ): Promise<emailStatus> {
    try {
      const status =
        deposit.blockId > 0
          ? TransactionStatus.COMPLETED
          : TransactionStatus.PENDING;
      const dbDeposit = await Transactions.findOne({ hash: deposit.hash });
      if (this.isPendingDeposit(status, dbDeposit)) {
        const user = await this.getUser(userId);
        return sendPendingTxEmail(
          user,
          this.symbol,
          deposit.value * 0.00000001
        );
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async getUnspentInfo(
    txs: TransactionBTC[],
    wallet: Wallet
  ): Promise<UnspentInfo> {
    const outputs = await blockchain.getAddressUtxo(
      wallet.address,
      this.isTestNet
    );
    const unspentBalance = outputs
      .filter(({ height }) => height > 0)
      .reduce((prev, curr) => (prev += curr.value), 0);
    return { outputs, balance: unspentBalance };
  }
  createRawTx(txData: TxData, unspentInfo: UnspentInfo): { hash: string } {
    const network = networks[this.isTestNet ? 'testnet' : 'bitcoin'];
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
  async handleThreshold(
    unspentInfo: UnspentInfo,
    wallet: Wallet
  ): Promise<void> {
    if (unspentInfo.balance - this.txFee > this.threshold) {
      try {
        const { hash } = this.createRawTx(
          {
            senderWIF: wallet.wif,
            receiverAddress: this.redxamAddress
          },
          unspentInfo
        );

        const txData = await blockchain.broadcastTx(hash, this.isTestNet);

        if (txData.status === 200) {
          await sendBalanceSurpassThreshold(
            wallet.userId,
            this.threshold * 0.00000001,
            unspentInfo.balance * 0.00000001,
            txData.data.result,
            this.symbol
          );

          await Transactions.create({
            amount: unspentInfo.balance - this.txFee,
            hash: txData.data.result,
            userId: wallet.userId,
            address: wallet.address,
            timestamp: new Date().getTime(),
            direction: TransactionTypes.INTERNAL,
            type: DepositsType.CRYPTO,
            currency: DepositsCurrencyType.BTC,
            status: TransactionStatus.PENDING,
            processedByRedxam: false
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
  async tokenToFiat(satoshis: number, fiat: Fiats): Promise<number> {
    const tokenPrice = (
      await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    ).data.bpi[fiat].rate_float;
    return satoshis * 0.00000001 * tokenPrice;
  }
}
