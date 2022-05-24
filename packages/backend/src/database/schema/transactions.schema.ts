import { Schema } from 'mongoose';
import {
  DepositsType,
  DepositsCurrencyType,
  TransactionTypes,
  TransactionStatus
} from '../enums';

export const TransactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    type: {
      type: String,
      enum: DepositsType,
      default: DepositsType.CRYPTO
    },
    currency: {
      type: String,
      enum: DepositsCurrencyType,
      default: DepositsCurrencyType.BTC
    },
    amount: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      required: false
    },
    timestamp: {
      type: Number,
      required: true
    },
    processedByRedxam: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      enum: TransactionStatus,
      required: true
    },
    stripeChargeId: {
      type: String,
      required: false
    },
    bankName: {
      type: String,
      required: false
    },
    bankIcon: {
      type: String,
      required: false
    },
    bankType: {
      type: String,
      required: false
    },
    network: {
      type: String,
      required: false
    },
    direction: {
      type: String,
      enum: TransactionTypes,
      default: TransactionTypes.DEPOSIT
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
