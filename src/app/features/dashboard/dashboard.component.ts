import { Component, OnInit } from '@angular/core';
import { AccountListComponent } from '../../core/account-list/account-list.component';
import { TransactionsListComponent } from '../../core/transactions-list/transactions-list.component';
import { TransfertFormComponent } from '../../core/transfert-form/transfert-form.component';
import { Account, Transaction, TransferFormData } from '../../models';
import { CommonModule } from '@angular/common';
import { mockAccounts, mockTransactions } from '../../data';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../services/account.service';
import { TransfertService } from '../../services/transfert.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AccountListComponent, 
    TransactionsListComponent, 
    TransfertFormComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  activeTab: 'accounts' | 'transactions' | 'transfer' = 'accounts';

  constructor(
    private http: HttpClient, 
    private accountService: AccountService,
    private transactionService: TransfertService
  ) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(result => {
      console.log('accounts : ', result)
      this.accounts = result
    })
    this.transactionService.getTransactions().subscribe(result => {
      console.log('transactions : ', result)
      this.transactions = result
    })
  }

  // Mock transfer submit handler - à remplacer par vrai
  onTransferSubmit(data: TransferFormData) {
    console.log('Transfer submitted:', data);
  }

  get totalBalance(): number {
    return this.accounts.reduce((sum, account) => sum + account.balance, 0);
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  }

  handleTransferSubmit(transferData: TransferFormData) {
    const transferId = Date.now().toString();
    const currentDate = new Date().toISOString();

    const debitTransaction: Transaction = {
      id: `${transferId}_debit`,
      accountId: transferData.fromAccountId,
      amount: -transferData.amount,
      type: 'transfer',
      category: 'Virement',
      description: transferData.description,
      date: currentDate,
      recipient: `Vers ${this.accounts.find(acc => acc.id === transferData.toAccountId)?.name}`,
      reference: transferData.reference || `VIR${transferId}`
    };

    const creditTransaction: Transaction = {
      id: `${transferId}_credit`,
      accountId: transferData.toAccountId,
      amount: transferData.amount,
      type: 'transfer',
      category: 'Virement',
      description: transferData.description,
      date: currentDate,
      recipient: `De ${this.accounts.find(acc => acc.id === transferData.fromAccountId)?.name}`,
      reference: transferData.reference || `VIR${transferId}`
    };

    // Mettre à jour les soldes des comptes
    this.accounts = this.accounts.map(account => {
      if (account.id === transferData.fromAccountId) {
        return { ...account, balance: account.balance - transferData.amount };
      }
      if (account.id === transferData.toAccountId) {
        return { ...account, balance: account.balance + transferData.amount };
      }
      return account;
    });

    // Ajouter les nouvelles transactions
    this.transactions = [
      creditTransaction,
      debitTransaction,
      ...this.transactions
    ];
  }
}
