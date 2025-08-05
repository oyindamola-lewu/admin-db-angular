import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { DashboardHeader } from './layout/dashboard-header/dashboard-header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    Sidebar,
    DashboardHeader, RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
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
