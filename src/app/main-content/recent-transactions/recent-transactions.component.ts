import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/Backend/backend-module/services/transactions.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent implements OnInit, OnDestroy {

  editedTransaction: any | null = null;
    isEditing = false;
  transactions: any[] = [];
  currentMonth!: string;
  currentDate: Date = new Date(); // Инициализируйте текущую дату значением по умолчанию
  categoryType!: 'expense' | 'income';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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
    this.transactionsService.getTransactionsForMonth(year, month)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data) => {
        this.transactions = data;
        this.currentMonth = this.getCurrentMonthFormatted();
      });
  }

  private getCurrentMonthFormatted(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return this.currentDate.toLocaleDateString('en-US', options);
  }

  editTransaction(transaction: any): void {
    // Сначала отключите режим редактирования для всех элементов
    this.transactions.forEach((item) => (item.isEditing = false));
    
    // Затем включите режим редактирования только для выбранного элемента
    transaction.isEditing = true;
    
    // Скопируйте данные элемента в editedTransaction
    this.editedTransaction = { ...transaction };
  
    // Присвойте значения транзакции в соответствующие input
    transaction.editedName = transaction.name;
    transaction.editedDate = transaction.date;
    transaction.editedDescription = transaction.description;
    transaction.editedSumm = transaction.summ;
  }
  
  saveChanges(transaction: any): void {
    // Проверяем, что данные изменены, чтобы избежать ненужных запросов на сервер
    if (
      transaction.name !== transaction.editedName ||
      transaction.date !== transaction.editedDate ||
      transaction.description !== transaction.editedDescription ||
      transaction.summ !== transaction.editedSumm
    ) {
      // Создаем объект с обновленными данными
      const updatedTransaction = {
        name: transaction.editedName,
        date: transaction.editedDate,
        description: transaction.editedDescription,
        summ: transaction.editedSumm,
      };
  
      // Вызываем метод updateTransaction из сервиса, передавая ID транзакции и новые данные
      this.transactionsService.updateTransaction(transaction.id, updatedTransaction)
  .subscribe((updatedTransactionData) => {
    // После успешного обновления, обновляем данные в объекте transaction
    transaction.name = updatedTransactionData.name;
    transaction.date = updatedTransactionData.date;
    transaction.description = updatedTransactionData.description;
    transaction.summ = updatedTransactionData.summ;

    // Завершаем режим редактирования
    transaction.isEditing = false;

    // Если вы хотите обновить список транзакций, можно сделать это здесь
    // Вызвать метод загрузки транзакций или обновить текущий список
    // Например, вызвать this.loadTransactionsForCurrentMonth();
  });

    } else {
      // Если данные не изменились, просто завершаем режим редактирования
      transaction.isEditing = false;
    }
  }
  

  deleteTransaction(transaction: { id: any }): void {
    const id = transaction.id;
    console.log(id);
    this.transactionsService.deleteTransaction(id)
      .pipe(
        switchMap(() => this.transactionsService.getTransactionsForMonth(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1
        )),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data) => {
        // Обновление списка транзакций после удаления
        this.transactions = data;
      });
  }

  cancelEdit(transaction: any): void {
    // Здесь вы можете вставить логику отмены редактирования
    // Например, если у вас есть временные копии данных, вы можете восстановить их состояние
    // После этого завершите режим редактирования
    transaction.isEditing = false;
  }
}

