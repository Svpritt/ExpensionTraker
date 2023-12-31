import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  createCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/categories`, categoryData);
  }
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/categories`);
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/categories/${id}`);
  }
  updateCategory(id: number, categoryData: any): Observable<any> {
    return this.http.patch(`${this.serverUrl}/categories/${id}`, categoryData);
  }
  getExpenseCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/categories/expense`);
  }
  getIncomeCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/categories/income`);
  }
}
export interface Category {
  id?: number;
  name: string;
  icon: string;
  amount: number;
  type: 'expense' | 'income'; // строга типізація , замість стрінг підказка на випадок опечатки, хоча я гадаю це поле автоматично заповниться далі
}