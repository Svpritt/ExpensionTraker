import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GoNestService {
  private serverUrl = 'http://localhost:3000'; // Замените на адрес вашего Nest.js сервера

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
  
  createCategory(categoryData: any): Observable<any> {
    // Отправляем данные на сервер для создания новой категории
    return this.http.post(`${this.serverUrl}/categories`, categoryData);
  }
}
