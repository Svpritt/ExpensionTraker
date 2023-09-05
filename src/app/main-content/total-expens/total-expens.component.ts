import { Component } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { ExpenseCategory, ExpenseCategoryService } from 'src/app/services/expense-category.service';



@Component({
  selector: 'app-total-expens',
  templateUrl: './total-expens.component.html',
  styleUrls: ['./total-expens.component.css']
})
export class TotalExpensComponent {
  isModalOpen = false;
  currentMounth:string = this.dateService.getCurrentDateFormatted('MM')

  constructor(
    private dateService: DateService,
    private categoryService: ExpenseCategoryService
    ){}

    get categories(): ExpenseCategory[] {
      return this.categoryService.getCategories();
    }

  openModal() {
    this.isModalOpen = true;

  }
  closeModal(){
    this.isModalOpen = false;
  }

}
