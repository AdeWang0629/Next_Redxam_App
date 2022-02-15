export interface Deposit {
  type: string;
  amount: number;
  index: null;
  currency: string;
  timestamp: number;
  processedByRedxam: true | false;
  status: string;
  hash: null;
  address: null;
  bankIcon: string | null;
  bankName: string | null;
  bankType: string | null;
}
