// product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  name: string;
  status: 'active' | 'draft' | 'archived';
  price: number;
  totalSales: number;
  createdAt: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Smartphone X Pro',
      status: 'active',
      price: 999.0,
      totalSales: 150,
      createdAt: '7/22/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 2,
      name: 'Wireless Earbuds Ultra',
      status: 'active',
      price: 199.0,
      totalSales: 300,
      createdAt: '7/22/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 3,
      name: 'Smart Home Hub',
      status: 'active',
      price: 149.0,
      totalSales: 200,
      createdAt: '7/22/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 4,
      name: '4K Ultra HD Smart TV',
      status: 'active',
      price: 799.0,
      totalSales: 50,
      createdAt: '7/22/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 5,
      name: 'Gaming Laptop Pro',
      status: 'active',
      price: 1299.0,
      totalSales: 75,
      createdAt: '7/22/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 6,
      name: 'Portable Bluetooth Speaker',
      status: 'draft',
      price: 89.99,
      totalSales: 120,
      createdAt: '7/21/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 7,
      name: 'Noise-Cancelling Headphones',
      status: 'archived',
      price: 249.99,
      totalSales: 60,
      createdAt: '7/20/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 8,
      name: 'Smartwatch Series Z',
      status: 'active',
      price: 329.0,
      totalSales: 180,
      createdAt: '7/19/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 9,
      name: 'Wireless Charging Pad',
      status: 'draft',
      price: 59.99,
      totalSales: 90,
      createdAt: '7/18/2025',
      image: 'https://placehold.co/40x40',
    },
    {
      id: 10,
      name: 'Ultra Slim Laptop Stand',
      status: 'archived',
      price: 39.99,
      totalSales: 200,
      createdAt: '7/17/2025',
      image: 'https://placehold.co/40x40',
    },


  ]);

  products$ = this._products.asObservable();

  get products(): Product[] {
    return this._products.value;
  }

  updateProducts(newProducts: Product[]) {
    this._products.next(newProducts);
  }
}