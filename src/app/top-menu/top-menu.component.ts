import { Component, OnInit, } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { MobileMenuService } from '../services/mobile-menu.service';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {
  currentDate: string = this.dateService.getCurrentDateFormatted('dd.MM.yy');

  constructor(private dateService: DateService, private mobileMenuService: MobileMenuService) {}

  toggleMobileMenu() {
    this.mobileMenuService.toggleMobileMenu();
  }

}




  // implements OnInit

  // ngOnInit(): void {
  //   this.getCurrentDate();
  // }

  // getCurrentDate() {
  //   this.currentDate 

  // }
