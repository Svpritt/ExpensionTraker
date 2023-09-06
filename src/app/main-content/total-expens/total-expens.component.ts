import { Component } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { ExpenseCategory, ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { IncomeCategory, IncomeCategoryService } from 'src/app/services/income-category.service';



@Component({
  selector: 'app-total-expens',
  templateUrl: './total-expens.component.html',
  styleUrls: ['./total-expens.component.css']
})
export class TotalExpensComponent {
  isModalOpen = false;
  currentMounth:string = this.dateService.getCurrentDateFormatted('MM')
  categoryType!: 'expense' | 'income'; // Здесь определяем тип категорий


  constructor(
    private dateService: DateService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
        ){}

    get categories(): ExpenseCategory[] {
      return this.expenseCategoryService.getCategories();
    }
    
    openModal(categoryType: 'expense' | 'income') {
      this.isModalOpen = true;
      this.categoryType = categoryType; // Установка categoryType при открытии модального окна
    }
  closeModal(){
    this.isModalOpen = false;
  }

}
