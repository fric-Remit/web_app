import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account, TransferFormData } from '../../models';
import { CommonModule } from '@angular/common';
import { TransferRequest, TransfertService } from '../../services/transfert.service';

@Component({
  selector: 'app-transfert-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transfert-form.component.html',
  styleUrl: './transfert-form.component.scss'
})
export class TransfertFormComponent {
  @Input() accounts: Account[] = [];
  @Output() onTransferSubmit = new EventEmitter<TransferFormData>();

  transferForm: FormGroup;
  isConfirmOpen = false;
  isProcessing = false;
  errors: Partial<Record<keyof TransferFormData, string>> = {};

  constructor(private fb: FormBuilder, private transfertService: TransfertService) {
    this.transferForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      reference: [''],
    }, { updateOn: 'blur' });
  }

  get availableAccounts(): Account[] {
    const fromId = this.transferForm.get('fromAccountId')?.value;
    return this.accounts.filter(acc => acc.type !== 'savings' || acc.id === fromId);
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  getAccountName(accountId: string): string {
    return this.accounts.find(acc => acc.id === accountId)?.name || '';
  }

  getSelectedAccountBalance(): number {
    const fromAccountId = this.transferForm.get('fromAccountId')?.value;
    const account = this.accounts.find(a => a.id === fromAccountId);
    return account ? account.balance : 0;
  }

  validateForm(): {isCorrect: boolean, data: TransferRequest} {
    this.errors = {};

    const fromAccountId = this.transferForm.get('fromAccountId')?.value;
    const toAccountId = this.transferForm.get('toAccountId')?.value;
    const amount = this.transferForm.get('amount')?.value;
    const description = this.transferForm.get('description')?.value || '';

    if (!fromAccountId) {
      this.errors.fromAccountId = 'Veuillez sélectionner un compte émetteur';
    }
    if (!toAccountId) {
      this.errors.toAccountId = 'Veuillez sélectionner un compte destinataire';
    }
    if (fromAccountId === toAccountId) {
      this.errors.toAccountId = 'Le compte destinataire doit être différent du compte émetteur';
    }
    if (!amount || amount <= 0) {
      this.errors.amount = 'Le montant doit être supérieur à 0';
    }
    const fromAccount = this.accounts.find(acc => acc.id === fromAccountId);
    if (fromAccount && amount > fromAccount.balance) {
      this.errors.amount = 'Solde insuffisant';
    }
    if (!description.trim()) {
      
      this.errors.description = 'Veuillez saisir une description';
    }

    const data: TransferRequest = {
      fromAccountId,
      toAccountNumber: toAccountId,
      note: description,
      currency: 'XAF',
      amount
    }

    return {
      isCorrect: Object.keys(this.errors).length === 0,
      data
    };
  }

  onSubmit() {
    if (this.validateForm().isCorrect) {
      this.isConfirmOpen = true;
    }
  }

  async onConfirmTransfer() {
    if (this.transferForm.invalid) return;
    this.isProcessing = true;

    const data = this.validateForm().data;
    this.transfertService.saveTransfer(data).subscribe(result => {
      console.log('transfert envoye')
    })

    // Vous pouvez ici appeler une API, simuler delay :
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Emission des données
    this.onTransferSubmit.emit(this.transferForm.value);

    // Reset form
    this.transferForm.reset({
      fromAccountId: '',
      toAccountId: '',
      amount: 0,
      description: '',
      reference: '',
    });
    this.isConfirmOpen = false;
    this.isProcessing = false;
  }

  onCancelConfirm() {
    this.isConfirmOpen = false;
  }
}
