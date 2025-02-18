import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CategoryComponent } from './category/category/category.component';
import { ProductComponent } from './product/product/product.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { BillComponent } from './bill/bill.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  // Routes for different sections under 'cafe'
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'bills', component: BillComponent },
  // { path: 'analytics', component: AnalyticsComponent },

  // Catch-all route for undefined paths inside 'cafe'
  { path: '**', redirectTo: 'dashboard' }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeRoutingModule { }
