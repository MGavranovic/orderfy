import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent },
];
