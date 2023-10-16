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
  updateTransaction(id: number, transactionData: any): Observable<any> {
    return this.http.patch(`${this.serverUrl}/income-transaction/${id}`, transactionData);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/income-transaction/${id}`);
  }
}


// тут потрібно зробити складний Observable але я роблю бек для ознайомлення з ним і поки що не вмію цього робити, але потім я вивчу це і зроблю.
//я гадаю мені потрібно зробити так щоб мій createTransaction робив якийсь стейт і давав про це знати для getTransactionsForMounth 
//  тоді при пуші нової транзакціі у меня обновляться данні з підписки
// зараз я це роблю через підписки і відписки та виклкикаю методи знову при змінах де я це зазначив