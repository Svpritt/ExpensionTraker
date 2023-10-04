import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/income-transaction`, transactionData);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/income-transaction`);
  }

  getTransactionsForMonth(year: number, month: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/income-transaction/transactions-for-month?year=${year}&month=${month}`);
  }
}


//сделать сложный обзервабл в гете, который будет дергаться по команде.
//когда отрабатывается create дать команду для get чтоб он заново зарезервил данные.
//событие