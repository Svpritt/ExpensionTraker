import { Component } from '@angular/core';
import { ExpenseCategory, ExpenseCategoryService} from 'src/app/services/expense-category.service';
import { IncomeCategoryService, IncomeCategory } from 'src/app/services/income-category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  selectedCategoryService: any;
  selectedCategory!: ExpenseCategory | IncomeCategory; //указываю что если будет выполнен код который требует селектед категори то это переменная всегда будет заполнена
  selectedCategoryType: 'expense' | 'income' | null = null;
  categoryName: string = '';
  selectedIcon: string = '';
  name: string = ''; // Объявление свойства name
  icon: string = ''; // Объявление свойства icon
  isAddMode: boolean = false; // це змінна типу флажок щоб розуміти що нажав користувач категорію чи кнопку добавити
  currentCategory!: ExpenseCategory | IncomeCategory;
  constructor(private expenseCategoryService: ExpenseCategoryService, private incomeCategoryService: IncomeCategoryService) { }
    get categories(): ExpenseCategory[] {
      return this.expenseCategoryService.getCategories();
    }
    get incomeCategories(): IncomeCategory[]  {
      return this.incomeCategoryService.getCategories();
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
    console.log(this.selectedCategory)
  }
  selectCategory(category: ExpenseCategory | IncomeCategory, categoryType: 'expense' | 'income'): void {
    this.selectedCategory = category;
    this.selectedCategoryType = categoryType;
    this.name = this.selectedCategory.name;
    this.icon = this.selectedCategory.icon;
    console.log(this.selectedCategory, this.selectedCategoryType)
    this.openAddCategory(categoryType);
  }
  
  
}
