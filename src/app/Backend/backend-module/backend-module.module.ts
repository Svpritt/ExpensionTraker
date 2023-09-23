// backend.module.ts

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsService } from './services/transactions.service';
import { CategoryService } from './services/category.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [TransactionsService, CategoryService],
})
export class BackendModule {}
