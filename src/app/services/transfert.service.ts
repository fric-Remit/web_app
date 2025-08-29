import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models';

export interface TransferRequest {
  fromAccountId: string;
  toAccountNumber: string;
  amount: number;
  currency: string;
  note: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransfertService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions');
  }

  saveTransfer(transfer: TransferRequest): Observable<any> {
    return this.http.post('/api/transferRequests', transfer);
  }
}