import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Category } from 'src/app/Backend/backend-module/services/category.service';
import { ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { IncomeCategoryService } from 'src/app/services/income-category.service';
import { DateService } from 'src/app/services/date.service';
import { TransactionsService } from 'src/app/Backend/backend-module/services/transactions.service';


Chart.register(...registerables);

@Component({
  selector: 'app-chart-hover',
  templateUrl: './chart-hover.component.html',
  styleUrls: ['./chart-hover.component.css']
})
export class ChartHoverComponent {
  expenseCategories: Category[] = [];
  incomeCategories: Category [] = [];
  currentDate: Date = new Date(); 
  currentMounth:string = this.dateService.getCurrentDateFormatted('MM')
  transactions: any[] = [];
  constructor(
    private dateService: DateService,
    private TransactionsService: TransactionsService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
  ){}
  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactionsForCurrentMonth();
  }

  private getCurrentMonthFormatted(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    // console.log(this.currentDate)
    return this.currentDate.toLocaleDateString('en-US', options); 
  }
  private loadCategories() {
    this.expenseCategoryService.getCategories().subscribe((categories: Category[]) => {
      this.expenseCategories = categories;
      // console.log(this.expenseCategories) 
    });
    this.incomeCategoryService.getCategories().subscribe((categories: Category[]) => {
      this.incomeCategories = categories;
      // console.log(this.incomeCategories) 
    });
  }
  private loadTransactionsForCurrentMonth(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() +1 ; // Добавляем 1, так как месяцы начинаются с 0

    this.TransactionsService.getTransactionsForMonth(year, month).subscribe((data) => {
      this.transactions = data;
      this.currentMounth = this.getCurrentMonthFormatted();
      this.incomeCategories = this.aggregateAndUpdateCategories( this.transactions, this.incomeCategories)
      this.expenseCategories = this.aggregateAndUpdateCategories(this.transactions, this.expenseCategories);
      console.log(this.incomeCategories)
      console.log(this.expenseCategories)
      this.RenderChart(this.incomeCategories, this.expenseCategories);

    });
  }
  private aggregateAndUpdateCategories(transactions: any[], Categories: Category[]): Category[] {
    const aggregatedData: any[] = [];
    // Инициализируем все категории с amount равным 0
    Categories.forEach((category) => {
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
    this.expenseCategories.forEach((category) => {
      const matchingAggregate = aggregatedData.find((aggregate) => aggregate.name === category.name);
      if (matchingAggregate) {
        category.amount = matchingAggregate.totalSumm;
      }
    });
    this.incomeCategories.forEach((category) => {
      const matchingAggregate = aggregatedData.find((aggregate) => aggregate.name === category.name);
      if (matchingAggregate) {
        category.amount = matchingAggregate.totalSumm;
      }
    });
    return  Categories;
  }
  RenderChart(incomeCategories: Category[], expenseCategories: Category[]) {
    const categoryNames = [...incomeCategories, ...expenseCategories].map(category => category.name);
    const categoryData = [...incomeCategories, ...expenseCategories].map(category => category.amount);
    const categoryColors = [
      ...incomeCategories.map(() => 'rgba(83, 236, 83, 0.2)'), // Зелений колір
      ...expenseCategories.map(() => 'rgba(255, 99, 132, 0.2)') // Червоний колір
    ];
  
    const myChart = new Chart("piechart", {
      type: 'bar',
      data: {
        labels: categoryNames,
        datasets: [{
          label: '# of Votes',
          data: categoryData,
          backgroundColor: categoryColors,
          borderColor: categoryColors.map(color => color.replace('0.2', '1')),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
}
