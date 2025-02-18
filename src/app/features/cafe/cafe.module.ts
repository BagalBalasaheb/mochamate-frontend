import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CafeRoutingModule } from './cafe-routing.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardAddComponent } from './dashboard/dashboard-add/dashboard-add.component';
import { CategoryComponent } from './category/category/category.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { ProductComponent } from './product/product/product.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { HomePageComponent } from './homePage/home-page/home-page.component';
import { MaterialModule } from '../../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BillComponent } from './bill/bill.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAddComponent,
    CategoryComponent,
    CategoryAddComponent,
    ProductComponent,
    ProductAddComponent,
    OrdersComponent,
    OrderDetailComponent,
    HomePageComponent,
    BillComponent
  ],
  imports: [
    CommonModule,
    CafeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CafeModule { }
