import { Routes } from '@angular/router';
import { AddProducts } from './products/add-products/add-products';


export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
   { path: 'add-products', component: AddProducts },
  { path: '**', redirectTo: '' }, // wildcard for 404
];