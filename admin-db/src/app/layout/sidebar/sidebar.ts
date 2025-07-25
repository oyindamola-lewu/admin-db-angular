import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {
  
  navItems = [
    { icon: '/favicon.ico', route: '/dashboard', label: 'Dashboard', active: false },
    { icon: '/home.png', route: '/home', label: 'Home', active: false },
    { icon: '/cart.png', route: '/shop', label: 'Shop', active: false },
    { icon: '/products.png', route: '/inventory', label: 'Inventory', active: true },
    { icon: '/profile.png', route: '/profile', label: 'Profile', active: false },
    { icon: '/chart.png', route: '/analytics', label: 'Analytics', active: false }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateActiveState();
  }

  onNavItemClick(item: any, index: number): void {
    this.navItems.forEach(navItem => navItem.active = false);
    
    item.active = true;
    
    this.router.navigate([item.route]);
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  onSettingsClick(): void {
    this.router.navigate(['/settings']);
  }

  private updateActiveState(): void {
    const currentRoute = this.router.url;
    this.navItems.forEach(item => {
      item.active = item.route === currentRoute;
    });
  }
}