import { Routes } from '@angular/router';
import { AddProducts } from './products/add-products/add-products';
import { Profile } from './pages/profile/profile';
import { ProductsHome } from './pages/inventory/inventory';
import { Carts } from './pages/carts/carts';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home},
  { path: 'inventory', component: ProductsHome },
    { path: 'carts', component: Carts },
  { path: 'add-products', component: AddProducts },
  { path: 'add-products/:id', component: AddProducts },
  { path: 'profile', component: Profile },

  { path: '**', redirectTo: '' },
];
