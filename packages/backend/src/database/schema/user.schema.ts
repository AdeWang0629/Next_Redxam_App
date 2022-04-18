import { Schema } from 'mongoose';
import { UsersPortfolios } from '../enums';

export const SimpleWalletSchema = new Schema(
  {
    address: {
      type: String,
      required: true
    },
    wif: {
      type: String,
      required: true
    },
    txsCount: {
      type: Number,
      default: 0
    },
    hasPendingTxs: {
      type: Boolean,
      default: false
    }
  },
  {
    _id: false
  }
);

export const TokenWalletSchema = new Schema(
  {
    BTC: SimpleWalletSchema,
    TEST_BTC: SimpleWalletSchema,
    POLYGON_USDT: SimpleWalletSchema,
    USDT_POLYGON: SimpleWalletSchema,
    POLYGON_USDC: SimpleWalletSchema,
    POLYGON_DAI: SimpleWalletSchema,
    TEST_POLYGON_USDT: SimpleWalletSchema,
    TEST_USDT_POLYGON: SimpleWalletSchema,
    MATIC: SimpleWalletSchema,
    TEST_MATIC: SimpleWalletSchema
  },
  {
    _id: false
  }
);

export const bankAccountChild = new Schema({
  id: String,
  name: String,
  logo: String,
  type: String
});

export const bankAccount = new Schema({
  accessToken: String,
  accounts: [bankAccountChild]
});

export const balanceRecordsSchema = new Schema({
  balance: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Number,
    required: true
  }
});

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    },
    wallets: {
      type: TokenWalletSchema,
      required: true
    },
    wallet: {
      type: SimpleWalletSchema,
      required: false
    },
    contribution: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    accountBalance: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      required: false,
      index: true
    },
    verification: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      required: false
    },
    accountStatus: {
      type: String,
      required: true
    },
    deposited: {
      type: Number,
      default: 0
    },
    withdrawn: {
      type: Number,
      default: 0
    },
    hasPendingTxs: {
      type: Boolean,
      default: false
    },
    balanceRecords: {
      type: [balanceRecordsSchema],
      default: []
    },
    birthPlace: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    nearestLandmark: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    marriedStatus: {
      type: String,
      required: false
    },
    occupation: {
      type: String,
      required: false
    },
    identityIDType: {
      type: String,
      required: false
    },
    identityIDNumber: {
      type: String,
      required: false
    },
    issuance: {
      type: String,
      required: false
    },
    issuancePlace: {
      type: String,
      required: false
    },
    issuanceDate: {
      type: String,
      required: false
    },
    issuanceStatus: {
      type: String,
      required: false
    },
    expiringDate: {
      type: String,
      required: false
    },
    bankAccounts: {
      type: [bankAccount],
      default: []
    },
    portfolio: {
      type: String,
      enum: UsersPortfolios,
      default: UsersPortfolios.PASSIVE
    },
    waitlistToken: {
      type: String,
      required: false
    },
    referralCode: {
      type: String,
      required: false
    },
    referralId: {
      type: String,
      required: false
    },
    mxId: {
      type: String,
      required: false
    },
    leanCustomerId: {
      type: String,
      required: false
    },
    discordId: {
      type: String,
      required: false
    },
    invitationCode: {
      type: String,
      required: false
    },
    invitationAccepted: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
