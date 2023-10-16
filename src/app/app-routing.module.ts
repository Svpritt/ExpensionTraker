import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TotalExpensComponent } from './main-content/total-expens/total-expens.component';
import { CategoriesComponent } from './main-content/categories/categories.component';
import { RecentTransactionsComponent } from './main-content/recent-transactions/recent-transactions.component';
import { ChartDisplayComponent } from './main-content/chart/chart-display/chart-display.component';

const routes: Routes = [
  { path: '', redirectTo: '/total-expense', pathMatch: 'full' }, // По умолчанию переходить на Total Expense
  { path: 'total-expense', component: TotalExpensComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'recent-transactions', component: RecentTransactionsComponent }, 
  { path: 'chart', component: ChartDisplayComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
