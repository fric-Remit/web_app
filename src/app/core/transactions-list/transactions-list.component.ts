import { Component, Input } from '@angular/core';
import { Account, Transaction } from '../../models';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CardHeaderComponent } from '../../shared/ui/card-header/card-header.component';
import { CardTitleComponent } from '../../shared/ui/card-title/card-title.component';
import { CardContentComponent } from '../../shared/ui/card-content/card-content.component';

type SortField = 'date' | 'amount' | 'description';
type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent
  ],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] = [];
  @Input() accounts: Account[] = [];

  searchTerm = '';
  typeFilter = 'all';
  accountFilter = 'all';
  dateFilter = 'all';
  sortField: SortField = 'date';
  sortOrder: SortOrder = 'desc';
  currentPage = 1;
  itemsPerPage = 10;

  get filteredAndSortedTransactions(): Transaction[] {
    let filtered = this.transactions.filter(transaction => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (transaction.recipient?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        transaction.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = this.typeFilter === 'all' || transaction.type === this.typeFilter;
      const matchesAccount = this.accountFilter === 'all' || transaction.accountId === this.accountFilter;

      let matchesDate = true;
      if (this.dateFilter !== 'all') {
        const transactionDate = new Date(transaction.date);
        const today = new Date();

        switch (this.dateFilter) {
          case 'today':
            matchesDate = transactionDate.toDateString() === today.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = transactionDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = transactionDate >= monthAgo;
            break;
        }
      }
      return matchesSearch && matchesType && matchesAccount && matchesDate;
    });

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (this.sortField) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        default:
          return 0;
      }

      if (this.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }

  get paginatedTransactions(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAndSortedTransactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAndSortedTransactions.length / this.itemsPerPage);
  }

  onSearchTermChange(event: Event) {
  const target = event.target as HTMLInputElement;
  this.searchTerm = target.value;
  this.currentPage = 1;
}

onTypeFilterChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.typeFilter = target.value;
  this.currentPage = 1;
}

onAccountFilterChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.accountFilter = target.value;
  this.currentPage = 1;
}

onDateFilterChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.dateFilter = target.value;
  this.currentPage = 1;
}

  handleSort(field: SortField) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'desc';
    }
    this.currentPage = 1;
  }

  getTransactionTypeLabel(type: Transaction['type']): string {
    switch (type) {
      case 'credit':
        return 'Crédit';
      case 'debit':
        return 'Débit';
      case 'transfer':
        return 'Virement';
      default:
        return type;
    }
  }

  getTransactionTypeBadgeVariant(type: Transaction['type']): string {
    switch (type) {
      case 'credit':
        return 'default';
      case 'debit':
        return 'destructive';
      case 'transfer':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  getAccountName(accountId: string): string {
    const account = this.accounts.find(acc => acc.id === accountId);
    return account?.name || 'Compte inconnu';
  }

  previousPage() {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }

  nextPage() {
    this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
  }
}