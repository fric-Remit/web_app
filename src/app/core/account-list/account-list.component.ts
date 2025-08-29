import { Component, Input } from '@angular/core';
import { Account } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent {
  @Input() accounts: Account[] = [];

  getAccountTypeLabel(type: Account['type']): string {
    switch(type) {
      case 'checking': return 'Compte Courant';
      case 'savings': return 'Épargne';
      default: return type;
    }
  }

  getAccountTypeBadgeClass(type: Account['type']): string {
    switch(type) {
      case 'checking': return 'badge-default';
      case 'savings': return 'badge-secondary';
      default: return 'badge-default';
    }
  }

  formatBalance(balance: number, currency: string): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(balance);
  }
}
