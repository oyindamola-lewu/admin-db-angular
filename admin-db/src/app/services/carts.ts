import { Injectable } from '@angular/core';

export interface Cart {
  name: string;
  email: string;
  avatar: string;
  items: { icon: string; name: string }[];
  extraItems: number;
  value: string;
  lastActivity: { time: string; action: string };
  status: 'active' | 'idle' | 'checkout' | 'abandoned';
}

@Injectable({ providedIn: 'root' })
export class CartsService {
  private carts: Cart[] = [
{
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=ff69b4&color=fff',
      items: [
        { icon: '📱', name: 'iPhone 15' },
        { icon: '🎧', name: 'AirPods Pro' }
      ],
      extraItems: 1,
      value: '$1,248.00',
      lastActivity: { time: '2 minutes ago', action: 'Added item' },
      status: 'active'
    },
    {
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=4a90e2&color=fff',
      items: [
        { icon: '📱', name: 'iPhone 13' },
        { icon: '⌚', name: 'Apple Watch' }
      ],
      extraItems: 0,
      value: '$1,099.00',
      lastActivity: { time: '15 minutes ago', action: 'Viewed cart' },
      status: 'idle'
    },
    {
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=50c878&color=fff',
      items: [
        { icon: '📱', name: 'iPhone 16' }
      ],
      extraItems: 0,
      value: '$1,200.00',
      lastActivity: { time: '1 hour ago', action: 'Started checkout' },
      status: 'checkout'
    }  ];

  getCarts(): Cart[] {
    return this.carts;
  }

  getActiveCartsCount(): number {
    return this.carts.length;
  }

  getAbandonedCartsCount(): number {
    return this.carts.filter(c => c.status === 'abandoned').length;
  }
}