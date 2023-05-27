import { Document, model, Model } from 'mongoose';
import { VaultSchema } from '../schema/vault.schema';

export interface Vault {
  type: string;
  totalContribution: number;
  vaults: { [key: string]: SingleVault };
}

interface SingleVault {
  prevBalance: number;
  amount: number;
  balance: number;
  interestRate: number;
  token: string;
  tokenBalance: number;
}

export interface VaultProps extends Document, Vault {
  created_at?: Date;
  updated_at?: Date;
}

export const Vault = model<VaultProps>('Vault', VaultSchema);
