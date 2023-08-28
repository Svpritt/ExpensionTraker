import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
 


  private categories: Category[] = [
    {
      name: "Mortgage / Rent",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
    },
    {
      name: "Food",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Utilities",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Bills",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Shopping",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Transportation",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Insurance",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Health Care",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Clothing",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Entertainment",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Education",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Travel",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Gifts",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
    {
      name: "Charity",
      icon: "path-to-icon",
      amount: 0,
      date: 0,
        
    },
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  removeCategory(category: Category): void {
    const index = this.categories.indexOf(category);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }

  editCategory(oldCategory: Category, newCategory: Category): void {
    const index = this.categories.indexOf(oldCategory);
    if (index !== -1) {
      this.categories[index] = newCategory;
    }
  }
}
export interface Category {
  name: string;
  icon: string; // Предположим, что иконка - это строка с путем к иконке
  amount: number;
  date: number;
}