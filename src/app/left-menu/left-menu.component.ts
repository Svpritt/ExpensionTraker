import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileMenuService } from 'src/app/services/mobile-menu.service';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
  // Массив элементов меню
  menuItems: string[] = [
    'Balance',
    'Recent Transactions',
    'Total Expense',
    'Categories',
    
  ];
  @Input() isMobileMenuOpen: boolean = false;
  constructor(private mobileMenuService: MobileMenuService) {
    this.mobileMenuService.isMobileMenuOpen$.subscribe(isOpen => {
      this.isMobileMenuOpen = isOpen;
    });
  }
  navigateTo(){}
}