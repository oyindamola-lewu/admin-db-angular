import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { ProductListComponent } from '../../products/product-list/product-list';
import { DashboardHeader } from '../../layout/dashboard-header/dashboard-header';

@Component({
  selector: 'app-inventory',
  imports: [

    DashboardHeader,
    ProductListComponent, RouterModule
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
    standalone: true,

})
export class ProductsHome {
isHome = true;

constructor(private router: Router) {
  this.router.events.subscribe(() => {
    this.isHome = this.router.url === '/';
  });
}
  protected readonly title = signal('admin-db');

  currentStatus: string = 'all'; 

  onTabChange(status: string) {
    this.currentStatus = status;
  
  }

  searchQuery: string = '';

onSearchChange(query: string) {
  this.searchQuery = query;
}

}
