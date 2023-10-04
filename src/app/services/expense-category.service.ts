import { Injectable } from '@angular/core';
import { CategoryService, Category } from '../Backend/backend-module/services/category.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ExpenseCategoryService  {
  constructor(private categoryService: CategoryService) {}

  getCategories(): Observable<Category[]> {
    return this.categoryService.getExpenseCategories();
  }

  addCategory(category: Category): void {
    // Вызов метода addCategory внутри CategoryService
    this.categoryService.createCategory(category);
  }

  removeCategory(category: Category): void {
    // Вызов метода removeCategory внутри CategoryService
    this.categoryService.deleteCategory(category.id!);
  }

  editCategory(oldCategory: Category, newCategory: Category ): void {
    // Вызов метода editCategory внутри CategoryService
    this.categoryService.updateCategory(oldCategory.id!, newCategory);
  }
}



