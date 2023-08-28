import { Component } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { Category, CategoryService } from 'src/app/services/category.service';



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
    private categoryService: CategoryService
    ){}

    get categories(): Category[] {
      return this.categoryService.getCategories();
    }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen = false;
  }

}
