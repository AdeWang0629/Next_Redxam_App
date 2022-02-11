export interface Transaction {
  readonly srcAddress: string;
  readonly destAddress: string;
  readonly value: number;
  readonly hash: string;
  readonly timestamp: number;
  readonly type: 'DEPOSIT' | 'WITHDRAWN';
}
