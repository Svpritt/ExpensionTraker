// category.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class CategoryService<T> {
  abstract getCategories(): T[];
  abstract addCategory(category: T): void;
  abstract removeCategory(category: T): void;
  abstract editCategory(oldCategory: T, newCategory: T): void;
}
