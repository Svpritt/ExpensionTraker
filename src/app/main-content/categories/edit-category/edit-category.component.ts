import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { icons } from 'src/app/services/iconsData'; // Импортируйте список иконок
import {ExpenseCategory, ExpenseCategoryService} from 'src/app/services/expense-category.service'; // Импортируйте сервис
import { IncomeCategory, IncomeCategoryService } from 'src/app/services/income-category.service';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements AfterViewInit  {
  icons: string[] = icons;
  selectedIcon: string = ''; // Переменная для хранения выбранной иконки
  categoryName: string = ''; // Переменная для хранения введенного имени категории
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveCategory = new EventEmitter<any>();
  @Input()
  selectedCategoryService!: ExpenseCategoryService | IncomeCategoryService;
  @Input() name!: string;
  @Input() icon!: string;
  @Input() isAddMode: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() categories: ExpenseCategory[] | IncomeCategory[] | undefined;
  @Input() selectedCategory!: ExpenseCategory | IncomeCategory;

  ngOnInit() {
    if (this.name !== '') {
      this.categoryName = this.name;
    }
    if (this.icon) {
      const prefixToRemove = 'assets/images/iconsSvg/';
      const iconName = this.icon.substring(prefixToRemove.length)
      this.selectedIcon =iconName;
    }
  }
  //устанавливаю скролл сразу на то место где выбрана иконка если компонент открыт по икон селект для едит. в НГ он инит не работало. спс chatGPT
  ngAfterViewInit() {
    const iconsContainer = document.querySelector('.select-icon'); // Замените на фактический селектор

    // Найдите все элементы с классом "icon-item"
    const iconItems = iconsContainer?.querySelectorAll('.icon-item');
  
    // Если найдены элементы иконок
    if (iconItems && iconItems.length > 0) {
      // Переберите элементы иконок
      iconItems.forEach((iconItem, index) => {
        // Проверьте, есть ли у текущей иконки класс "selected"
        if (iconItem.classList.contains('selected')) {
          // Выбранная иконка найдена
          console.log(`Выбрана иконка с индексом: ${index}`);
          
          // Количество иконок в одной строке
          const iconsPerRow = 4; // Замените на фактическое значение
  
          // Вычислите, на какой строке находится выбранная иконка
          const rowIndex = Math.floor(index / iconsPerRow);
  
          // Вычислите сколько пикселей нужно прокрутить, чтобы сделать выбранную иконку видимой
          const rowHeight = 75; // Высота контейнера с учетом трех строк и высоты иконок
          const scrollToPixels = rowIndex * rowHeight;
  
          // Установите scrollTop элемента, чтобы прокрутить к выбранной иконке
          if (iconsContainer) {
            iconsContainer.scrollTop = scrollToPixels;
          }
  
          // Прервите перебор, так как выбранная иконка уже найдена
          return;
        }
      });
    }
  }
  onCloseModal() {
    this.closeModal.emit();
  }
  constructor(private ExpenseCategoryService: ExpenseCategoryService, private IncomeCategoryService: IncomeCategoryService) {} // Внедрение сервиса в конструктор
  getIconPath(icon: string): string {
    return `assets/images/iconsSvg/${icon}`;
  }
  selectIcon(icon: string): void {
    if (this.selectedIcon === icon) {
      // Если иконка уже выбрана, отменить выбор
      this.selectedIcon = '';
      console.log(this.selectedIcon)
    } else {
      // Если иконка не выбрана, установить выбранную иконку
      this.selectedIcon = icon;
      console.log(this.selectedIcon)
    }
  }
  addCategory(): void {
    if (this.categoryName && this.selectedIcon) {
      const iconPath = `assets/images/iconsSvg/${this.selectedIcon}`;
      const newCategory = {
        name: this.categoryName,
        icon: iconPath,
        amount: 0, // Пример значения по умолчанию
        date: 0,   // Пример значения по умолчанию
      };
      this.selectedCategoryService.addCategory(newCategory)
      // Сбросить значения после добавления
      this.categoryName = '';
      this.selectedIcon = '';
      this.onCloseModal();
    }
  }
  editCategory(): void {
    console.log(this.categoryName, this.selectedIcon)
    console.log(this.categories)

    const iconPath = `assets/images/iconsSvg/${this.selectedIcon}`;
    const newCategory = {
      name: this.categoryName,
      icon: iconPath,
      amount: this.selectedCategory?.amount, // Пример значения по умолчанию
      date: this.selectedCategory?.date,   // Пример значения по умолчанию
    };
    this.selectedCategoryService.editCategory(this.selectedCategory, newCategory)
    this.categoryName = '';
    this.selectedIcon = '';
    this.onCloseModal();
  }
}
