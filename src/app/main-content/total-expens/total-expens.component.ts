import { Component, Input, } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { Category } from 'src/app/Backend/backend-module/services/category.service';
import { TransactionsService } from 'src/app/Backend/backend-module/services/transactions.service';
import { Subscription } from 'rxjs';
import { ModalExpenseService } from 'src/app/services/modal-expense.service';

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
  expenseCategories: Category[] = [];
  totalAmount: number = 0;

  private transactionsSubscription: Subscription | undefined;
  private categoriesSubscription: Subscription | undefined;
  private unsubscribeFromSubscriptions() {
    if (this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
  @Input() balance: number = 0;
  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactionsForCurrentMonth();
    
  }
  ngDoCheck(): void {
    this.updateBalance();
  }
  constructor(
    private dateService: DateService,
    private expenseCategoryService: ExpenseCategoryService,
    private TransactionsService: TransactionsService,
    public modalExpenseService: ModalExpenseService
        ){}

    private loadCategories() {
      this.expenseCategoryService.getCategories().subscribe((categories: Category[]) => {
        this.expenseCategories = categories;
        console.log(this.expenseCategories) 
      });}
    updateBalance() {}

    onDataUpdated() {
      console.log('111')
      this.unsubscribeFromSubscriptions();
      this.loadTransactionsForCurrentMonth();
    }

    
    switchMonth(offset: number): void {
      // Измените текущую дату на заданный месяц offset месяцев назад или вперед
      this.currentDate.setMonth(this.currentDate.getMonth() + offset);
      this.loadTransactionsForCurrentMonth();
    }
  
    private loadTransactionsForCurrentMonth(): void {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() +1; // Добавляем 1, так как месяцы начинаются с 0

      this.TransactionsService.getTransactionsForMonth(year, month).subscribe((data) => {
        this.transactions = data;
        this.currentMounth = this.getCurrentMonthFormatted();
        this.expenseCategories = this.aggregateAndUpdateCategories(this.transactions, this.expenseCategories);
        this.totalAmount = this.calculateTotalAmount(this.expenseCategories); // загальний тотал для обрахування выдсотків
      });
    }

    calculateTotalAmount(categories: Category[]): number {
      return categories.reduce((total, category) => total + category.amount, 0);
    }
    private getCurrentMonthFormatted(): string {
      const options: Intl.DateTimeFormatOptions = { month: 'long' };
      console.log(this.currentDate)
      return this.currentDate.toLocaleDateString('en-US', options); 
    }
    openModal(categoryType: 'expense' | 'income') {
      this.modalExpenseService.openModal(); // Вызов метода открытия модального окна
      this.categoryType = categoryType; // Установка categoryType при открытии модального окна
    }

  private aggregateAndUpdateCategories(transactions: any[], expenseCategories: Category[]): Category[] {
    const aggregatedData: any[] = [];
    // Инициализируем все категории с amount равным 0
    expenseCategories.forEach((category) => {
      category.amount = 0;
    });
  
    transactions.forEach((transaction) => {
      const matchingCategory = aggregatedData.find((aggregate) => aggregate.name === transaction.name);
      if (matchingCategory) {
        matchingCategory.totalSumm += transaction.summ;
      } else {
        aggregatedData.push({
          name: transaction.name,
          totalSumm: transaction.summ
        });
      }
    });
  
    // Обновляем категории на основе агрегированных данных
    expenseCategories.forEach((category) => {
      const matchingAggregate = aggregatedData.find((aggregate) => aggregate.name === category.name);
      if (matchingAggregate) {
        category.amount = matchingAggregate.totalSumm;
      }
    });
  
    return expenseCategories;
  }

  
}
  // updateExpenseCategoriesWithTransactions(transactions: any[], expenseCategories: any[]): any[] {
  //   transactions.forEach((transaction) => {
  //     const matchingCategory = expenseCategories.find((category) => category.name === transaction.name);
  //     if (matchingCategory) {
  //       matchingCategory.amount += transaction.summ;
  //     }
  //   });
  //   console.log(expenseCategories)
  //   return expenseCategories; 
  // }



  // private resetExpenseCategories(expenseCategories: Category[]): Category[] {
  //   return expenseCategories.map((category) => ({
  //     ...category,
  //     amount: 0
  //   }));
  // }