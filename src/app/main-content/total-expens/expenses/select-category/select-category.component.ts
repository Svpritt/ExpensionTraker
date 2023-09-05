import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ExpenseCategory, ExpenseCategoryService } from 'src/app/services/expense-category.service';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  categories: ExpenseCategory[] = [];
  selectedCategory: ExpenseCategory | undefined = undefined; // Свойство для хранения выбранной категории

  @Output() categorySelected = new EventEmitter<ExpenseCategory>();
  constructor(private categoryService: ExpenseCategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  selectCategory(category: ExpenseCategory) {
    // Проверяем, выбрана ли уже категория
    if (this.selectedCategory === category) {
      // Если категория уже выбрана, устанавливаем selectedCategory в null
      this.selectedCategory = undefined;
      this.categorySelected.emit(undefined);

    } else {
      // Если категория не выбрана, устанавливаем selectedCategory в новую категорию
      this.selectedCategory = category;
      this.categorySelected.emit(category);

    }

    // Отправляем выбранную категорию через событие categorySelected
   
  }
}
