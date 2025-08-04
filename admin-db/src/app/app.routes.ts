import { Routes } from '@angular/router';
import { AddProducts } from './products/add-products/add-products';
import { Profile } from './pages/profile/profile';
import { ProductsHome } from './pages/inventory/inventory';
import { Carts } from './pages/carts/carts';

export const routes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', component: ProductsHome },
    { path: 'carts', component: Carts },
  { path: 'add-products', component: AddProducts },
  { path: 'add-products/:id', component: AddProducts }, // <-- for editing
  { path: 'profile', component: Profile },

  { path: '**', redirectTo: '' }, // wildcard for 404
];
