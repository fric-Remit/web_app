export interface Transaction {
  id: string;
  date: string;
  accountId: string;
  description: string;
  recipient?: string;
  type: 'credit' | 'debit' | 'transfer' | string;
  category: string;
  amount: number;
  reference?: string;
}

export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  type: string;
  balance: number;
  currency: string;
}

export interface TransferFormData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  reference: string;
}
