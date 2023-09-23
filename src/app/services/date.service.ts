import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
    getCurrentDateFormatted(format: 'dd.MM.yy' | 'MM.yy' | 'MM' | 'yyyy-MM-dd', date: Date = new Date()): string {      
      if (format === 'MM') {
        const options1: Intl.DateTimeFormatOptions = { month: 'long' };
        return date.toLocaleDateString('en-US', options1);
      }
  
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
  

      if (format === 'dd.MM.yy') {
        return date.toLocaleDateString('ua-UA', options);
      } else if (format === 'MM.yy') {
        return date.toLocaleDateString('ua-UA', { year: '2-digit', month: 'numeric' });
      } else if (format === 'yyyy-MM-dd') {
        // Форматирование в "yyyy-MM-dd"
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы считаются с 0
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      } else {
        return '';
      }
    }
  }
  
