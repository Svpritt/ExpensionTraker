import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { icons } from 'src/app/services/iconsData'; // Импортируйте список иконок
import { ExpenseCategoryService} from 'src/app/services/expense-category.service'; // Импортируйте сервис
import {  IncomeCategoryService } from 'src/app/services/income-category.service';
import { Category, CategoryService } from 'src/app/Backend/backend-module/services/category.service';
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
  @Input() selectedCategoryService!: ExpenseCategoryService | IncomeCategoryService;
  @Input() name!: string;
  @Input() icon!: string;
  @Input() isAddMode: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() categories: Category[] | undefined;
  @Input() selectedCategory!: Category ;

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
  constructor(private categoryService: CategoryService) {} // Внедрение сервиса в конструктор
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
  deleteThisCategory(): void {
    if (this.selectedCategory && this.selectedCategory.id) {
      this.categoryService.deleteCategory(this.selectedCategory.id).subscribe(
        () => {
          console.log(`Категория с id ${this.selectedCategory.id} успешно удалена`);
          // Дополнительные действия после удаления, например, закрытие модального окна
          this.onCloseModal();
        },
        (error) => {
          console.error(`Ошибка при удалении категории с id ${this.selectedCategory.id}:`, error);
        }
      );
    }
  }
  
  addCategoryS(): void {
    if (this.categoryName && this.selectedIcon) {
      const iconPath = `assets/images/iconsSvg/${this.selectedIcon}`;
      let type = '';
      if (this.selectedCategoryService instanceof IncomeCategoryService) {
        type = 'income';
      } else {
        type = 'expense';
      }
      const newCategory = {
        name: this.categoryName,
        icon: iconPath,
        amount: 0, // Пример значения по умолчанию
        type: type // Добавляем тип категории
      };
      this.categoryService.createCategory(newCategory).subscribe(
        (response) => {
          // Обработка успешного ответа от сервера
          console.log('Категория успешно создана:', response);
          // Сбросить значения после добавления
          this.categoryName = '';
          this.selectedIcon = '';
          this.onCloseModal();
        },
        (error) => {
          // Обработка ошибки
          console.error('Ошибка при создании категории:', error);
        }
      );
    }
  }
  
editCategory():void{
  if (this.categoryName && this.selectedIcon && this.selectedCategory.id) {
    const iconPath = `assets/images/iconsSvg/${this.selectedIcon}`;
    const newCategoryData = {
      name: this.categoryName,
      icon: iconPath,
      amount: this.selectedCategory.amount,
    };
    this.categoryService.updateCategory(this.selectedCategory.id, newCategoryData).subscribe(
      (response) => {
        // Обработка успешного ответа от сервера
        console.log('Категория успешно обновлена:', response);
        // Сбросить значения после редактирования
        this.categoryName = '';
        this.selectedIcon = '';
        this.selectedCategory = undefined!;
        this.onCloseModal();
      },
      (error) => {
        // Обработка ошибки
        console.error('Ошибка при обновлении категории:', error);
      }
    );
  }
}

  // есть идея сделать едит по айди, при создании транзакции ей передавать так же categoryId и в случае изменения имени или иконки у категории 
  //у нее останется то же айди что и было. и все транзакции останутся с тем же айди что и было.
  //будет вопрос только в компонентах где список транзакций, придется по айди определять к какой категории относится та или иная транзакция и делать вывод.
  //придется чуть изменить ВСЕ и сразу, но зато потом будет пушка.
  //основные плюсы - легко редактировать, легко сопоставлять, нет необходимости в уникальном имени, можно будет так же редактировать саму транзакцию,
  //и перевыбрать ей категорию по айди.

  //сделать категорию (другое) у которой вместо id будет что-то типа undefind присваивать ей все транзакции айди категорий которых не найдено
  //таким образом при удалении категории общий баланс системы не будет меняться (за весь период)


}  



// editCategory(): void {
//   if (this.categoryName && this.selectedIcon && this.selectedCategory) {
//     const iconPath = `assets/images/iconsSvg/${this.selectedIcon}`;
//     const newCategoryData = {
//       name: this.categoryName,
//       icon: iconPath,
//       amount: this.selectedCategory.amount,
//     };
//     const categoryId = this.selectedCategory.id; // Получаем ID выбранной категории

//     this.categoryService.updateCategory(categoryId, newCategoryData).subscribe(
//       (response) => {
//         // Обработка успешного ответа от сервера
//         console.log('Категория успешно обновлена:', response);
//         // Сбросить значения после редактирования
//         this.categoryName = '';
//         this.selectedIcon = '';
//         this.selectedCategory = undefined;
//         this.onCloseModal();
//       },
//       (error) => {
//         // Обработка ошибки
//         console.error('Ошибка при обновлении категории:', error);
//       }
//     );
//   }
// }

//   editCategory(): void {
//     console.log(this.categoryName, this.selectedIcon)
//     console.log(this.categories)
//     const iconPath = `assets/images/iconsSvg/${this.selectedIcon}`;
//     let type = '';
//     const newCategory = {
//       name: this.categoryName,
//       icon: iconPath,
//       amount: this.selectedCategory?.amount, // Пример значения по умолчанию
//     };
//     if (this.selectedCategoryService instanceof IncomeCategoryService) {
//       type = 'income'
//     } else { type = 'expense'}
//     console.log(type)
//     this.selectedCategoryService.editCategory(this.selectedCategory, newCategory)
//     this.categoryName = '';
//     this.selectedIcon = '';
//     console.log(newCategory)
//     console.log(this.selectedCategoryService)

//     this.onCloseModal();
//   }
// }