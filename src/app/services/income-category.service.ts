import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';



@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService extends CategoryService<IncomeCategory> {
  constructor() {
    super();
  }

  private incomeCategories: IncomeCategory[] = [
    {
      name: "Cash",
      icon: 'assets/images/iconsSvg/credit-card-regular.svg',
      amount: 0,
    },
    {
      name: "Card",
      icon: 'assets/images/iconsSvg/money-bills-solid.svg',
      amount: 3700,
        
    },
  ]

  getCategories(): IncomeCategory[]  {
    return this.incomeCategories;
  }
  
  addCategory(incomeCategory: IncomeCategory): void {
    this.incomeCategories.push(incomeCategory);
  }

  removeCategory(incomeCategory: IncomeCategory): void {
    const index = this.incomeCategories.indexOf(incomeCategory);
    if (index !== -1) {
      this.incomeCategories.splice(index, 1);
    }
  }

  
  editCategory(oldIncomeCategory: IncomeCategory, newCategory: IncomeCategory): void {
    const index = this.incomeCategories.indexOf(oldIncomeCategory);
    if (index !== -1) {
      this.incomeCategories[index] = newCategory;
    }
  }
  
}
export interface IncomeCategory {
  name: string;
  icon: string; // Предположим, что иконка - это строка с путем к иконке
  amount: number;
}