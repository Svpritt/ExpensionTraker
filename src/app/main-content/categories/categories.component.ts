import { Component } from '@angular/core';
import { ExpenseCategoryService} from 'src/app/services/expense-category.service';
import { IncomeCategoryService } from 'src/app/services/income-category.service';
import { Category } from 'src/app/Backend/backend-module/services/category.service'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  selectedCategoryService: any;
  selectedCategory!: Category ; //указываю что если будет выполнен код который требует селектед категори то это переменная всегда будет заполнена
  selectedCategoryType: 'expense' | 'income' | null = null;
  categoryName: string = '';
  selectedIcon: string = '';
  name: string = ''; 
  icon: string = ''; 
  isAddMode: boolean = false; // це змінна типу флажок щоб розуміти що нажав користувач категорію чи кнопку добавити
  currentCategory!: Category ;
  expenseCategories: Category[] = [];
  incomeCategories: Category[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private expenseCategoryService: ExpenseCategoryService, private incomeCategoryService: IncomeCategoryService) { }
  
    ngOnInit() {
      this.loadCategories();
    }
    ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
    private loadCategories() {
      this.expenseCategoryService.getCategories().subscribe((categories: Category[]) => {
        this.expenseCategories = categories;
      });
    
      this.incomeCategoryService.getCategories().subscribe((categories: Category[]) => {
        this.incomeCategories = categories;
      });
    }
    isModalOpen = false; // Переменная для управления видимостью модального окна
    // Метод для открытия модального окна
    isEditCategoryOpen = false;
    openAddCategory(categoryType: string) {
      console.log()
      this.isEditCategoryOpen = true;
      if (categoryType === 'expense') {
        // Работа с категориями расходов
        this.selectedCategoryService = this.expenseCategoryService;
        this.isAddMode = !this.selectedCategory; // Если selectedCategory не существует, это режим добавления
        // Передаем данные в дочерний компонент
      } else if (categoryType === 'income') {
        // Работа с категориями доходов
        this.selectedCategoryService = this.incomeCategoryService;
        this.isAddMode = !this.selectedCategory; // Если selectedCategory не существует, это режим добавления
      }
    }
  closeEditCategory() {
    this.name = '';
    this.icon = '';
    this.isEditCategoryOpen = false;
    this.selectedCategory = undefined!; // поскольку до компиляции у меня всегда может быть 2 типа данных expense income
    // а после компиляции без вызова кода стандартное значение это undefind то и при сбросе я принудительно ставлю его же
    this.unsubscribe$.next();
    this.loadCategories();

  }
  selectCategory(category: Category , categoryType: 'expense' | 'income'): void {
    this.selectedCategory = category;
    this.selectedCategoryType = categoryType;
    this.name = this.selectedCategory.name;
    this.icon = this.selectedCategory.icon;
    //console.log(this.selectedCategory, this.selectedCategoryType)
    this.openAddCategory(categoryType);
  }
  
  
}
