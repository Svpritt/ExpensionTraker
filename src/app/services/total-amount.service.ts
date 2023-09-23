import { Injectable } from '@angular/core';
import { ExpenseCategory, ExpenseCategoryService } from './expense-category.service';
import { IncomeCategoryService } from './income-category.service';

@Injectable({
  providedIn: 'root',
})
export class TotalAmountService {
  constructor(
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
  ) {}

  getTotalExpense(): number {
    const expenseCategories = this.expenseCategoryService.getCategories();
    const totalExpense = expenseCategories.reduce(
      (sum, category) => sum + (category.amount || 0),
      0
    );
    return totalExpense;
  }

  getTotalIncome(): number {
    const incomeCategories = this.incomeCategoryService.getCategories();
    const totalIncome = incomeCategories.reduce(
      (sum, category) => sum + (category.amount || 0),
      0
    );
    return totalIncome;
  }

  getBalance(): number {
    const totalExpense = this.getTotalExpense();
    const totalIncome = this.getTotalIncome();
    return totalIncome - totalExpense;
  }

  getCategoryPercent(category: ExpenseCategory): number {
    const totalExpense = this.getTotalExpense();
    return (category.amount || 0) / totalExpense * 100;
  }
}
