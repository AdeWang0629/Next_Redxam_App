export interface Deposits {
  _id: string;
  type: string;
  amount: number;
  currency: string;
  timestamp: number;
  processedByRedxam: boolean;
  status: string;
  bankIcon: string;
  bankName: string;
}
