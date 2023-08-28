import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private isMobileMenuOpenSubject = new BehaviorSubject<boolean>(false);
  isMobileMenuOpen$ = this.isMobileMenuOpenSubject.asObservable();

  toggleMobileMenu() {
    this.isMobileMenuOpenSubject.next(!this.isMobileMenuOpenSubject.value);
  }
}
