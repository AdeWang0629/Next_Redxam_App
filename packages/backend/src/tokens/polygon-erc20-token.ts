/* eslint-disable lines-between-class-members */
import { ethers } from 'ethers';
import crypto from 'crypto';
import Web3 from 'web3';
import matic from '@/apis/polygon';
import { MaticTx } from '@/apis/polygon/types';
import { sendPendingTxEmail, emailStatus } from '@/apis/sendgrid';
import {
  User,
  Deposits,
  DepositsType,
  UserProps,
  DepositsProps
} from '@/database';
import {
  Token,
  Wallet,
  TransactionMatic,
  Deposit,
  DepositStatus,
  Fiats
} from './token';
import {
  MATIC_MAINNET_RPC,
  MATIC_TESTNET_RPC,
  MATIC_TX_FEE,
  MATIC_BALANCE_THRESHOLD,
  TEST_MATIC_BALANCE_THRESHOLD,
  REDXAM_ADDRESS_MATIC,
  REDXAM_FEE_ADDRESS,
  REDXAM_FEE_KEY,
  ERC20_TEST_CONTRACT,
  ERC20_TEST_DECIMALS
} from './consts';

import TEST_ABI from './polygon-abis/usdt-polygon-testnet.abi.json';

export class PolygonToken implements Token {
  isPendingDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return false;
  }
  isConfirmedDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return false;
  }
  isCofirmedDepositWithoutPending(
    status: DepositStatus,
    deposit: DepositsProps
  ): boolean {
    return false;
  }
  readonly name = '';
  readonly symbol = 'MATIC';
  readonly network = '';
  readonly isTestNet = false;
  readonly txFee = MATIC_TX_FEE;
  readonly threshold = MATIC_BALANCE_THRESHOLD;
  readonly testThreshold = TEST_MATIC_BALANCE_THRESHOLD;
  readonly redxamAddress = REDXAM_ADDRESS_MATIC;
  readonly redxamFeeAddress = REDXAM_FEE_ADDRESS;
  readonly redxamFeeKey = REDXAM_FEE_KEY;
  readonly contract = '';
  readonly decimals = 0;
  readonly abi = '';

  createWallet(): Wallet {
    const id = crypto.randomBytes(32).toString('hex');
    const privateKey = '0x' + id;
    const wallet = new ethers.Wallet(privateKey);
    return {
      address: wallet.address,
      wif: privateKey,
      txsCount: 0,
      hasPendingTxs: false
    };
  }
  validateAddress(address: string): boolean {
    return Web3.utils.isAddress(address);
  }

  getBalance(address: string): Promise<number> {
    return matic.getWalletBalance(address, this.contract, this.isTestNet);
  }

  getWalletTxs(address: string): Promise<TransactionMatic[]> {
    return new Promise(resolve => {
      setTimeout(async () => {
        const txs: MaticTx[] = await matic.getWalletTxs(
          address,
          this.contract,
          this.isTestNet
        );
        resolve(
          txs.map(tx => ({
            blockId: tx.blockNumber,
            value: tx.value,
            hash: tx.hash,
            address: tx.to
          }))
        );
      }, 500);
    });
  }

  getWalletDeposits(txs: TransactionMatic[], address: string): Deposit[] {
    return txs
      .filter(tx => tx.address.toLowerCase() === address.toLowerCase())
      .map((tx, index) => {
        return {
          ...tx,
          address,
          index
        };
      });
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
      await Deposits.updateOne(
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
            amount: deposit.value,
            network: this.network
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
    }

    const currentWallet = `wallets.${this.network}`;

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

  async getUser(userId: string): Promise<UserProps> {
    return User.findOne({ _id: userId });
  }

  async depositConfirmationMailing(
    deposit: Deposit,
    userId: string
  ): Promise<emailStatus> {
    try {
      const status = deposit.blockId > 0 ? 'completed' : 'pending';
      const dbDeposit = await Deposits.findOne({ hash: deposit.hash });
      const decimals = this.isTestNet ? ERC20_TEST_DECIMALS : this.decimals;
      if (this.isPendingDeposit(status, dbDeposit)) {
        const user = await this.getUser(userId);
        return sendPendingTxEmail(
          user,
          this.symbol,
          deposit.value / Math.pow(10, decimals)
        );
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async handleTokenThreshold(wallet: Wallet): Promise<void> {
    const balance = await this.getBalance(wallet.address);
    const threshold = this.isTestNet ? this.testThreshold : this.threshold;
    if (balance >= threshold) {
      await this.sendToFee(wallet);
      const rpc = this.isTestNet ? MATIC_TESTNET_RPC : MATIC_MAINNET_RPC;

      const contract_address = this.isTestNet
        ? ERC20_TEST_CONTRACT
        : this.contract;

      const decimals = this.isTestNet ? ERC20_TEST_DECIMALS : this.decimals;
      const contractABI = this.isTestNet ? TEST_ABI : this.abi;
      const amount = balance.toString();
      const gas_limit = '0x100000';

      const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);
      const walletCon = new ethers.Wallet(wallet.wif, ethersProvider);

      ethersProvider.getGasPrice().then(currentGasPrice => {
        // @ts-ignore
        let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
        // general token send
        let contract = new ethers.Contract(
          contract_address,
          contractABI,
          walletCon
        );
        console.log(decimals);
        let numberOfTokens = ethers.utils.parseUnits(amount, decimals);
        console.log(`numberOfTokens: ${numberOfTokens}`);

        contract
          .transfer(this.redxamAddress, numberOfTokens, {
            gasLimit: ethers.utils.hexlify(gas_limit),
            gasPrice: gas_price
          })
          .then(transferResult => {
            console.dir(transferResult);
          })
          .catch(console.log);
      });
    }
  }

  async sendToFee(wallet: Wallet): Promise<void> {
    const rpc = this.isTestNet ? MATIC_TESTNET_RPC : MATIC_MAINNET_RPC;

    const sender_address = REDXAM_FEE_ADDRESS;
    const senderPrivateKey = REDXAM_FEE_KEY;

    const amount = '0.01';
    const gas_limit = '0x100000';

    const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);
    const walletCon = new ethers.Wallet(senderPrivateKey);
    const walletSigner = walletCon.connect(ethersProvider);

    const currentGasPrice = await ethersProvider.getGasPrice();
    // @ts-ignore
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
    console.log(`gas_price: ${gas_price}`);
    const tx = {
      from: sender_address,
      to: wallet.address,
      value: ethers.utils.parseEther(amount),
      nonce: ethersProvider.getTransactionCount(sender_address, 'latest'),
      gasLimit: ethers.utils.hexlify(gas_limit),
      gasPrice: gas_price
    };
    try {
      await walletSigner.sendTransaction(tx);
    } catch (error) {
      console.error(error);
    }
  }

  async tokenToFiat(wey: number, fiat: Fiats): Promise<number> {
    const decimals = this.isTestNet ? ERC20_TEST_DECIMALS : this.decimals;
    return wey / Math.pow(10, decimals);
  }
  async getWallets(): Promise<Wallet[]> {
    const res = await User.find(
      {
        [`wallets.${this.network}`]: { $exists: true },
        verification: true,
        accountStatus: 'accepted'
      },
      { _id: 1, [`wallets.${this.network}`]: 1 }
    );

    return res.map(user => ({
      userId: user._id,
      address: user.wallets[this.network].address,
      txsCount: user.wallets[this.network].txsCount,
      hasPendingTxs: user.wallets[this.network].hasPendingTxs,
      wif: user.wallets[this.network].wif
    }));
  }
}
