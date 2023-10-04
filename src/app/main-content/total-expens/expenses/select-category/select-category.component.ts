import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { IncomeCategoryService } from 'src/app/services/income-category.service';
import { Category } from 'src/app/Backend/backend-module/services/category.service';
import { TransactionsService } from 'src/app/Backend/backend-module/services/transactions.service';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  categories: (Category )[] = []; // Массив категорий может содержать как расходы, так и доходы
  selectedCategory: (Category ) | undefined = undefined; // Свойство для хранения выбранной категории
  @Input() categoryType: 'expense' | 'income' | undefined; // Входное свойство для получения categoryType из родительского компонента


  @Output() categorySelected = new EventEmitter<Category>();
  constructor(private expenseCategoryService: ExpenseCategoryService,
    private TransactionsService: TransactionsService,
    // private Category: Category,
    private incomeCategoryService: IncomeCategoryService
    ) {}

    ngOnInit(): void {
      this.loadCategories(); // Загрузка категорий при инициализации компонента
    }
  
    // Метод для загрузки категорий в зависимости от типа (расходы или доходы)
    private loadCategories() {
      if (this.categoryType === 'expense') {
        this.expenseCategoryService.getCategories().subscribe((categories: Category[]) => {
          this.categories = categories;
          console.log(this.categories) 
  
        })
      }   else if (this.categoryType === 'income') {
        this.incomeCategoryService.getCategories().subscribe((categories: Category[]) => {
          this.categories = categories;
          console.log(this.categories)
        })
    }
  }
  selectCategory(category: Category) {
    // Проверяем, выбрана ли уже категория
    if (this.selectedCategory === category) {
      // Если категория уже выбрана, устанавливаем selectedCategory в сброс
      this.selectedCategory = undefined;
      this.categorySelected.emit(undefined);
    } else {
      // Если категория не выбрана, устанавливаем selectedCategory в новую категорию
      this.selectedCategory = category;
      console.log(category)
      this.categorySelected.emit(category);
    }
  }
  
  // selectCategory(category: Category) {
  //   // Проверяем, выбрана ли уже категория
  //   if (this.selectedCategory === category) {
  //     // Если категория уже выбрана, устанавливаем selectedCategory в null
  //     this.selectedCategory = undefined;
  //     this.categorySelected.emit(undefined);

  //   } else {
  //     // Если категория не выбрана, устанавливаем selectedCategory в новую категорию
  //     this.selectedCategory = category;
  //     this.categorySelected.emit(category);

  //   }

    // Отправляем выбранную категорию через событие categorySelected
   
 
}
