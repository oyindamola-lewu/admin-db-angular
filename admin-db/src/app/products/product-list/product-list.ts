import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  status: 'active' | 'draft' | 'archived';
  price: number;
  totalSales: number;
  createdAt: string;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() selectedStatusFilter: string | null = null;

  get filteredProducts() {
    let filtered = this.products;

    if (this.selectedStatusFilter && this.selectedStatusFilter !== 'all') {
      filtered = filtered.filter(
        (p) =>
          p.status.toLowerCase() === this.selectedStatusFilter!.toLowerCase()
      );
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return filtered.slice(start, end);
  }

  products: Product[] = [
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
  ];

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  get totalItems(): number {
    if (!this.selectedStatusFilter || this.selectedStatusFilter === 'all') {
      return this.products.length;
    }
    return this.products.filter(
      (p) => p.status.toLowerCase() === this.selectedStatusFilter?.toLowerCase()
    ).length;
  }
  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  formatDate(dateString: string): string {
    return dateString;
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  onProductAction(product: Product): void {
    // Handle product actions (edit, delete, etc.)
    console.log('Action clicked for product:', product);
  }

  get paginationInfo(): string {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(
      this.currentPage * this.itemsPerPage,
      this.totalItems
    );
    return `Showing ${startItem}-${endItem} of ${this.totalItems} products`;
  }

  get canGoBack(): boolean {
    return this.currentPage > 1;
  }

  get canGoForward(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return this.currentPage < totalPages;
  }
}
