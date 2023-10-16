import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { TotalExpensComponent } from './main-content/total-expens/total-expens.component';
import { IncomeComponent } from './main-content/total-expens/income/income.component';
import { ExpensesComponent } from './main-content/total-expens/expenses/expenses.component';
import { AccountBalanceComponent } from './main-content/account-balance/account-balance.component';
import { RecentTransactionsComponent } from './main-content/recent-transactions/recent-transactions.component';
import { FormsModule } from '@angular/forms';
import { SelectCategoryComponent } from './main-content/total-expens/expenses/select-category/select-category.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CategoriesComponent } from './main-content/categories/categories.component';
import { MobileMenuService } from './services/mobile-menu.service';
import { EditCategoryComponent } from './main-content/categories/edit-category/edit-category.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartDisplayComponent } from './main-content/chart/chart-display/chart-display.component';
import { ChartHoverComponent } from './main-content/chart/chart-hover/chart-hover.component';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LeftMenuComponent,
    TotalExpensComponent,
    IncomeComponent,
    ExpensesComponent,
    AccountBalanceComponent,
    RecentTransactionsComponent,
    SelectCategoryComponent,
    MainContentComponent,
    CategoriesComponent,
    EditCategoryComponent,
    ChartDisplayComponent,
    ChartHoverComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, 
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MobileMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
