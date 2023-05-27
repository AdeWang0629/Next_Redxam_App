import { Document, model, Model } from 'mongoose';
import { findOneOrCreate } from '../functions/findOneOrCreate';
import { UserSchema } from '../schema/user.schema';
import { TokenWallet, BalanceRecords, bankAccount } from '../types';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  wallets: TokenWallet;
  contribution?: number;
  level: number;
  verification?: boolean;
  token: string;
  balance: number;
  accountStatus?: string;
  balanceRecords?: [BalanceRecords];
  bankAccounts?: [bankAccount];
  withdrawn: number;
  birthPlace?: string;
  title?: string;
  address?: string;
  nearestLandmark?: string;
  state?: string;
  marriedStatus?: string;
  occupation?: string;
  identityIDType?: string;
  identityIDNumber?: string;
  issuance?: string;
  issuancePlace?: string;
  issuanceDate?: string;
  issuanceStatus?: string;
  expiringDate?: string;
  portfolio?: string;
  waitlistToken: string;
  referralCode: string;
  referralId?: string;
  mxId?: string;
  leanCustomerId?: string;
  discordId?: string;
  invitationCode?: string;
  invitationAccepted?: false;
}

export interface UserProps extends Document, User {
  created_at?: Date;
  updated_at?: Date;
}

export interface UserModel extends Model<UserProps> {
  findOneOrCreate: findOneOrCreate<UserProps, UserModel>;
}

export const User = model<UserProps, UserModel>('User', UserSchema);
