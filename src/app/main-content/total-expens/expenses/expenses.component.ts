import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { ExpenseCategory, ExpenseCategoryService } from 'src/app/services/expense-category.service';
import { IncomeCategoryService, IncomeCategory } from 'src/app/services/income-category.service';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit{
  currentDate: string = '';
  description: string = '';
  sum: number | null = null;
  selectedCategory: ExpenseCategory | IncomeCategory | undefined; // Добавляем переменную для хранения выбранной категории
  @Input() categoryType: 'expense' | 'income' | undefined; // Входное свойство для получения categoryType из родительского компонента

  
  constructor(private dateService: DateService){}

  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.closeModalEvent.emit();
  }

  ngOnInit(): void {
    this.currentDate = this.dateService.getCurrentDateFormatted('yyyy-MM-dd'); // Получаем сегодняшнюю дату в формате YYYY-MM-DD
  }

  logDateValue(dateValue: string) {
    console.log('Дата:', dateValue);
  }

  handleCategorySelected(category: ExpenseCategory) {
    this.selectedCategory = category; // Получаем выбранную категорию от дочернего компонента
  }
  addExpense(){
    if (                            // проверка заполнености всех свойств кроме Описания
      this.selectedCategory?.name !== undefined &&
      this.sum !== null &&
      this.currentDate !== ''
    ) {                             //консоль нужен что бы убедиться что данные получены, дальнейшая логика будет тут о передаче в сервисы
      console.log(this.selectedCategory?.name);
      console.log('Сумма:', this.sum);
      console.log('Дата:', this.currentDate);
      console.log('Описание:', this.description);
    } else {
      return;
    }
  }
 

}
