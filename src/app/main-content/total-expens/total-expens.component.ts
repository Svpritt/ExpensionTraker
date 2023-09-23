import { Component, Input, } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { ExpenseCategory, ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { GoNestService } from 'src/app/services/go-nest.service';
import { IncomeCategory, IncomeCategoryService } from 'src/app/services/income-category.service';
import { TotalAmountService } from 'src/app/services/total-amount.service';


@Component({
  selector: 'app-total-expens',
  templateUrl: './total-expens.component.html',
  styleUrls: ['./total-expens.component.css']
})
export class TotalExpensComponent {
  isModalOpen = false;
  currentMounth:string = this.dateService.getCurrentDateFormatted('MM')
  categoryType!: 'expense' | 'income'; 
  transactions: any[] = [];
  currentMonth!: string;
  currentDate: Date = new Date(); 
  @Input() balance: number = 0;


  ngOnInit(): void {
    this.loadTransactionsForCurrentMonth();
  }
  ngDoCheck(): void {
    this.updateBalance();
  }

  constructor(
    private dateService: DateService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService,
    public totalAmountService: TotalAmountService,
    private goNestService: GoNestService
        ){}

    get categories(): ExpenseCategory[] {
      return this.expenseCategoryService.getCategories();
    }
    updateBalance() {
      this.balance = this.totalAmountService.getBalance();
    }
    
    switchMonth(offset: number): void {
      // Измените текущую дату на заданный месяц offset месяцев назад или вперед
      this.currentDate.setMonth(this.currentDate.getMonth() + offset);
      this.loadTransactionsForCurrentMonth();
    }
  
    private loadTransactionsForCurrentMonth(): void {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1; // Добавляем 1, так как месяцы начинаются с 0
    
      this.goNestService.getTransactionsForMonth(year, month).subscribe((data) => {
        this.transactions = data;
        this.currentMonth = this.getCurrentMonthFormatted();
      });
    }
  
    private getCurrentMonthFormatted(): string {
      const options: Intl.DateTimeFormatOptions = { month: 'long' };
      console.log(this.currentDate)

      return this.currentDate.toLocaleDateString('en-US', options); 
    }
    openModal(categoryType: 'expense' | 'income') {
      this.isModalOpen = true;
      this.categoryType = categoryType; // Установка categoryType при открытии модального окна
    }
  closeModal(){
    this.isModalOpen = false;
  }

}
