import { Account, Transaction } from "../models";

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Compte Courant Principal',
    accountNumber: 'FR76 1234 5678 9012 3456 789',
    balance: 35420.75,
    currency: 'XAF',
    type: 'checking'
  },
  {
    id: '2',
    name: 'Livret A',
    accountNumber: 'FR76 9876 5432 1098 7654 321',
    balance: 1285000.00,
    currency: 'XAF',
    type: 'savings'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    accountId: '1',
    amount: -45.20,
    type: 'debit',
    category: 'Alimentation',
    description: 'Achat Supermarché Carrefour',
    date: '2024-12-15T10:30:00Z',
    recipient: 'CARREFOUR PARIS 15'
  },
  {
    id: '2',
    accountId: '1',
    amount: 2500.00,
    type: 'credit',
    category: 'Salaire',
    description: 'Virement salaire',
    date: '2024-12-01T09:00:00Z',
    recipient: 'ENTREPRISE ABC'
  },
  {
    id: '3',
    accountId: '1',
    amount: -850.00,
    type: 'debit',
    category: 'Logement',
    description: 'Loyer Décembre',
    date: '2024-12-01T08:00:00Z',
    recipient: 'AGENCE IMMOBILIERE XYZ'
  },
  {
    id: '4',
    accountId: '2',
    amount: 500.00,
    type: 'transfer',
    category: 'Épargne',
    description: 'Virement vers Livret A',
    date: '2024-12-10T14:20:00Z',
    reference: 'VIR123456'
  },
  {
    id: '5',
    accountId: '3',
    amount: 1200.00,
    type: 'credit',
    category: 'Facture',
    description: 'Paiement client DEF',
    date: '2024-12-12T16:45:00Z',
    recipient: 'CLIENT DEF SARL'
  },
  {
    id: '6',
    accountId: '1',
    amount: -120.50,
    type: 'debit',
    category: 'Transport',
    description: 'Plein essence',
    date: '2024-12-08T18:30:00Z',
    recipient: 'STATION TOTAL'
  },
  {
    id: '7',
    accountId: '1',
    amount: -35.00,
    type: 'debit',
    category: 'Loisirs',
    description: 'Cinéma UGC',
    date: '2024-12-07T20:15:00Z',
    recipient: 'UGC CINEMA'
  },
  {
    id: '8',
    accountId: '2',
    amount: 25.30,
    type: 'credit',
    category: 'Intérêts',
    description: 'Intérêts Livret A',
    date: '2024-11-30T23:59:00Z'
  },
  {
    id: '9',
    accountId: '3',
    amount: -450.00,
    type: 'debit',
    category: 'Fournitures',
    description: 'Achat matériel bureau',
    date: '2024-12-05T11:20:00Z',
    recipient: 'OFFICE DEPOT'
  },
  {
    id: '10',
    accountId: '1',
    amount: -89.99,
    type: 'debit',
    category: 'Télécoms',
    description: 'Facture mobile Orange',
    date: '2024-12-03T12:00:00Z',
    recipient: 'ORANGE FRANCE'
  },
  {
    id: '11',
    accountId: '1',
    amount: -25.90,
    type: 'debit',
    category: 'Alimentation',
    description: 'Boulangerie du Coin',
    date: '2024-12-14T07:30:00Z',
    recipient: 'BOULANGERIE MARTIN'
  },
  {
    id: '12',
    accountId: '3',
    amount: 750.00,
    type: 'credit',
    category: 'Facture',
    description: 'Paiement client GHI',
    date: '2024-12-11T10:15:00Z',
    recipient: 'CLIENT GHI SAS'
  },
  {
    id: '13',
    accountId: '1',
    amount: -65.00,
    type: 'debit',
    category: 'Santé',
    description: 'Pharmacie Central',
    date: '2024-12-09T14:45:00Z',
    recipient: 'PHARMACIE CENTRAL'
  },
  {
    id: '14',
    accountId: '2',
    amount: -200.00,
    type: 'transfer',
    category: 'Virement',
    description: 'Retrait pour urgence',
    date: '2024-12-06T16:20:00Z',
    reference: 'VIR789012'
  },
  {
    id: '15',
    accountId: '3',
    amount: -1200.00,
    type: 'debit',
    category: 'Taxes',
    description: 'TVA Trimestre 4',
    date: '2024-12-04T09:30:00Z',
    recipient: 'DIRECTION GENERALE DES FINANCES'
  },
  {
    id: '16',
    accountId: '1',
    amount: -145.75,
    type: 'debit',
    category: 'Services',
    description: 'Assurance auto',
    date: '2024-12-02T11:00:00Z',
    recipient: 'AXA ASSURANCES'
  },
  {
    id: '17',
    accountId: '1',
    amount: 50.00,
    type: 'credit',
    category: 'Remboursement',
    description: 'Remboursement Sécu',
    date: '2024-11-29T15:30:00Z',
    recipient: 'CPAM PARIS'
  },
  {
    id: '18',
    accountId: '3',
    amount: 2100.00,
    type: 'credit',
    category: 'Facture',
    description: 'Prestation consultant',
    date: '2024-11-28T17:45:00Z',
    recipient: 'CABINET CONSEIL ABC'
  }
];