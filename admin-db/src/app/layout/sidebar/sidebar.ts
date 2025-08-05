import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  imports: [RouterModule, CommonModule],
})
export class Sidebar implements OnInit {
  navItems = [
   
    { icon: '/home.png', route: '/home', label: 'Home', active: false },
    { icon: '/cart.png', route: '/carts', label: 'Carts', active: false },
    {
      icon: '/products.png',
      route: '/inventory',
      label: 'Inventory',
      active: false,
    },
    {
      icon: '/profile.png',
      route: '/profile',
      label: 'Profile',
      active: false,
    },
    {
      icon: '/chart.png',
      route: '/analytics',
      label: 'Analytics',
      active: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateActiveState();
    this.router.events.subscribe(() => this.updateActiveState());
  }

  onNavItemClick(item: any, index: number): void {
    this.navItems.forEach((navItem) => (navItem.active = false));

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
    this.navItems.forEach((item) => {
      item.active =
        currentRoute === item.route ||
        currentRoute.startsWith(item.route + '/');
    });
  }
}
