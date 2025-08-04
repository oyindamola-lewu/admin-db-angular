import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { DashboardHeader } from './layout/dashboard-header/dashboard-header';
@Component({
  selector: 'app-root',
  imports: [
    Sidebar,
    Header,
    DashboardHeader,
    ProductListComponent, RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('admin-db');

  currentStatus: string = 'all'; // default

  onTabChange(status: string) {
    this.currentStatus = status;
  
  }

  searchQuery: string = '';

onSearchChange(query: string) {
  this.searchQuery = query;
}

}
