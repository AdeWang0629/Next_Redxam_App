export interface Deposit {
  _id: string;
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

export interface Users {
  accountStatus: string;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}
