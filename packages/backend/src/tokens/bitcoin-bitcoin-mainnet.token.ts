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
  Deposits,
  InternalDeposits,
  DepositsType,
  UserProps,
  DepositsProps
} from '@/database';
import {
  Token,
  Wallet,
  Transaction,
  Deposit,
  DepositStatus,
  UnspentInfo,
  TxData
} from './token';
import { BTC_BALANCE_THRESHOLD, BTC_TX_FEE, REDXAM_ADDRESS } from './consts';

export class BitcoinBitcoinMainnetToken implements Token {
  readonly name = 'Bitcoin';
  readonly symbol = 'BTC';
  readonly network = 'Bitcoin';
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
  async getWalletTxs(address: string): Promise<Transaction[]> {
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
  getWalletDeposits(txs: Transaction[], address: string): Deposit[] {
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
      // await this.depositConfirmationMailing(deposit, wallet.userId);
      const updatedDeposit = await Deposits.updateOne(
        { userId: wallet.userId, hash: deposit.hash },
        {
          $set: {
            userId: wallet.userId,
            address: wallet.address,
            index: deposit.index,
            type: DepositsType.CRYPTO,
            currency: this.symbol,
            processedByRedxam: false,
            hash: deposit.hash,
            amount: deposit.value
          },
          $setOnInsert: {
            timestamp: Date.now(),
            status: 'pending'
          }
        },
        {
          upsert: true
        }
      );
      if (updatedDeposit.upserted) {
        const priceres = await axios.get(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        await User.updateOne(
          { _id: wallet.userId },
          {
            $inc: {
              pending_balance:
                deposit.value * 0.00000001 * priceres.data.bpi.USD.rate_float
            }
          }
        );
      }
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
  isPendingDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return status === 'pending' && !deposit;
  }
  isConfirmedDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return status === 'completed' && deposit && deposit.status === 'pending';
  }
  isCofirmedDepositWithoutPending(
    status: DepositStatus,
    deposit: DepositsProps
  ): boolean {
    return status === 'completed' && !deposit;
  }
  async getUser(userId: string): Promise<UserProps> {
    return User.findOne({ _id: userId });
  }
  async depositConfirmationMailing(
    deposit: Deposit,
    userId: string
  ): Promise<emailStatus> {
    const status = deposit.blockId > 0 ? 'completed' : 'pending';
    const dbDeposit = await Deposits.findOne({ hash: deposit.hash });
    if (this.isPendingDeposit(status, dbDeposit)) {
      const user = await this.getUser(userId);
      return sendPendingTxEmail(user, this.symbol, deposit.value * 0.00000001);
    } else if (this.isConfirmedDeposit(status, dbDeposit)) {
      const user = await this.getUser(userId);
      return sendConfirmedTxEmail(
        user,
        this.symbol,
        deposit.value * 0.00000001
      );
    } else if (this.isCofirmedDepositWithoutPending(status, dbDeposit)) {
      const user = await this.getUser(userId);
      return sendConfirmedTxEmail(
        user,
        this.symbol,
        deposit.value * 0.00000001
      );
    }
  }
  async getUnspentInfo(
    txs: Transaction[],
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

          await InternalDeposits.create({
            amount: unspentInfo.balance - this.txFee,
            hash: txData.data.result,
            userId: wallet.userId,
            address: wallet.address,
            timestamp: new Date().getTime()
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
}
