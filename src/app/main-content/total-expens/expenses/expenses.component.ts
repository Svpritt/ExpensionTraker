import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { Category, CategoryService } from 'src/app/Backend/backend-module/services/category.service';
import { TotalExpensComponent } from '../total-expens.component';
import { TransactionsService } from 'src/app/Backend/backend-module/services/transactions.service';
import { ModalExpenseService } from 'src/app/services/modal-expense.service'; // Импортируйте сервис для модального окна

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  private currentIndex = 0;
  private data = [];
  currentDate: string = '';
  description: string = '';
  sum: number | null = null;
  selectedCategory: Category | undefined;
  @Input() categoryType: 'expense' | 'income' | undefined;
  @Input() totalExpens!: TotalExpensComponent;

  constructor(private dateService: DateService,
    private TransactionService: TransactionsService,
    private ModalExpenseService: ModalExpenseService // Внедрите сервис модального окна
    ){
      fetch('/assets/transactions.json')
      .then((response) => response.json())
      .then((jsonData) => {
        this.data = jsonData;
        // this.startUploadingData(); загрузка сгенерированных данных
      });
    }
  
  ngOnInit(): void {
    this.currentDate = this.dateService.getCurrentDateFormatted('yyyy-MM-dd'); // Получаем сегодняшнюю дату в формате YYYY-MM-DD
  }
  logDateValue(dateValue: string) {
    console.log('Дата:', dateValue);
  }
  handleCategorySelected(category: Category) {
    this.selectedCategory = category; // Получаем выбранную категорию от дочернего компонента
  }
  sendDataToServer() {
    console.log('1')
    if (
      this.selectedCategory?.name !== undefined &&
      this.sum !== null &&
      this.currentDate !== ''
    ) {
      const data = {
        date: this.currentDate,
        name: this.selectedCategory.name,
        summ: this.sum,
        description: this.description,
        categoryType: this.categoryType,
      };
      this.TransactionService.createTransaction(data).subscribe({
        next: () => {
          this.totalExpens.onDataUpdated();
          console.log('дата успішно відправленно');
        },
        error: () => {
          console.log('помилка при відправленні');
        },
      });
      // const dateParts = this.currentDate.split("-");
      console.log(this.selectedCategory?.name);
      console.log('Сумма:', this.sum);
      console.log('Дата:', this.currentDate);
      console.log('Описание:', this.description);
      console.log(this.categoryType);
      this.ModalExpenseService.closeModal();
    } else {
      return;
    }
  } 
  closeModal() {
    console.log('Закрытие модального окна');
    this.ModalExpenseService.closeModal();
  }
}

// @Output() closeModalEvent = new EventEmitter<void>();
//   closeModal() {
//     this.closeModalEvent.emit();
//   }

  // // Создаем объект Date
  //     // Важно: месяцы в объекте Date начинаются с 0, поэтому вычитаем 1 из месяца
  //     const dateObject = new Date(
  //       parseInt(dateParts[0], 10),  // Год
  //       parseInt(dateParts[1], 10) - 1,  // Месяц
  //       parseInt(dateParts[2], 10)  // День
  //     );



  // startUploadingData() {
  //   const interval = setInterval(() => {
  //     if (this.currentIndex < this.data.length) {
  //       const transaction = this.data[this.currentIndex];

  //       // Отправка одной записи на сервер
  //       this.goNestService.createTransaction(transaction).subscribe({
  //         next: () => {
  //           console.log('Запись успешно отправлена');
  //         },
  //         error: () => {
  //           console.log('Ошибка при отправке записи');
  //         },
  //       });

  //       this.currentIndex++;

  //       if (this.currentIndex === this.data.length) {
  //         clearInterval(interval); // Остановить отправку после последней записи
  //       }
  //     }
  //   }, 10); // Интервал отправки данных в миллисекундах (0.01 секунды)
  // }


  //   addExpense(): void {
//     if (!this.selectedCategory) {
//       return;
//     }
  
//     let currentAmount = this.selectedCategory.amount || 0; // Получаем текущее значение amount или устанавливаем 0, если его нет
//   let newAmount = currentAmount; // Используем текущее значение как начальное значение для newAmount // Получаем текущее значение amount или устанавливаем 0, если его нет
//     if (this.sum !== null) {
//       newAmount += this.sum; // Увеличиваем amount на значение из sum
//     }
  
//     let newCategory: Category;
// if (this.categoryType === 'expense') {
//   newCategory = {
//     name: this.selectedCategory.name || '',
//     icon: this.selectedCategory.icon || '',
//     amount: newAmount,
//     type: 'expense',
//   };
//   this.expenseCategoryService.editCategory(this.selectedCategory, newCategory);
//   console.log(newCategory)
// } else {
//   newCategory = {
//     name: this.selectedCategory.name || '',
//     icon: this.selectedCategory.icon || '',
//     amount: newAmount,
//     type: 'income',
//   };
//   this.incomeCategoryService.editCategory(this.selectedCategory, newCategory);
//   console.log(newCategory)
// }
//   }