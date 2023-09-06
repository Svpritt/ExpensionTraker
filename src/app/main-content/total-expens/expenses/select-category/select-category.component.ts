import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ExpenseCategory, ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { IncomeCategory, IncomeCategoryService } from 'src/app/services/income-category.service';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  categories: (ExpenseCategory | IncomeCategory)[] = []; // Массив категорий может содержать как расходы, так и доходы
  selectedCategory: (ExpenseCategory | IncomeCategory) | undefined = undefined; // Свойство для хранения выбранной категории
  @Input() categoryType: 'expense' | 'income' | undefined; // Входное свойство для получения categoryType из родительского компонента


  @Output() categorySelected = new EventEmitter<IncomeCategory>();
  constructor(private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
    ) {}

    ngOnInit(): void {
      this.loadCategories(); // Загрузка категорий при инициализации компонента
    }
  
    // Метод для загрузки категорий в зависимости от типа (расходы или доходы)
    private loadCategories() {
      if (this.categoryType === 'expense') {
        this.categories = this.expenseCategoryService.getCategories();
      } else if (this.categoryType === 'income') {
        this.categories = this.incomeCategoryService.getCategories();
      }
    }

  selectCategory(category: IncomeCategory | ExpenseCategory) {
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
