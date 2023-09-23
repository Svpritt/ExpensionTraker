import { Component, OnInit } from '@angular/core';
import { GoNestService } from 'src/app/services/go-nest.service';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent implements OnInit {
  transactions: any[] = [];
  currentMonth!: string;
  currentDate: Date = new Date(); // Инициализируйте текущую дату значением по умолчанию

  constructor(
    private goNestService: GoNestService
  ) { }

  ngOnInit(): void {
    this.loadTransactionsForCurrentMonth();
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
}
