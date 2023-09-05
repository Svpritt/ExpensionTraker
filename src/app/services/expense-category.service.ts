import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseCategoryService extends CategoryService<ExpenseCategory> {
 
  constructor() {
    super();
  }

  private categories: ExpenseCategory[] = [
    {
      name: "House",
      icon: 'assets/images/iconsSvg/house-chimney-solid.svg',
      amount: 0,
      date: 0,
    },
    {
      name: "Food",
      icon: 'assets/images/iconsSvg/utensils-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Utilities",
      icon: 'assets/images/iconsSvg/bath-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Bills",
      icon: 'assets/images/iconsSvg/coins-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Shopping",
      icon: 'assets/images/iconsSvg/basket-shopping-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Transportation",
      icon: 'assets/images/iconsSvg/truck-arrow-right-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Insurance",
      icon: 'assets/images/iconsSvg/building-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Health Care",
      icon: 'assets/images/iconsSvg/hand-holding-heart-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Clothing",
      icon: 'assets/images/iconsSvg/shirt-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Entertainment",
      icon: 'assets/images/iconsSvg/credit-card-regular.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Education",
      icon: 'assets/images/iconsSvg/pen-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Travel",
      icon: 'assets/images/iconsSvg/route-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Gifts",
      icon: 'assets/images/iconsSvg/route-solid.svg',
      amount: 0,
      date: 0,
        
    },
    {
      name: "Charity",
      icon: 'assets/images/iconsSvg/tree-solid.svg',
      amount: 0,
      date: 0,
        
    },
  ];


  getCategories(): ExpenseCategory[] {
    return this.categories;
  }

  addCategory(category: ExpenseCategory): void {
    this.categories.push(category);
  }

  removeCategory(category: ExpenseCategory): void {
    const index = this.categories.indexOf(category);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }

  editCategory(oldExpenseCategory: ExpenseCategory, newCategory: ExpenseCategory ): void {
    const index = this.categories.indexOf(oldExpenseCategory);
    if (index !== -1) {
      this.categories[index] = newCategory;
    }
  }
  
}
export interface ExpenseCategory {
  name: string;
  icon: string; // Предположим, что иконка - это строка с путем к иконке
  amount: number;
  date: number;
}

