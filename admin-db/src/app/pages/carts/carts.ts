import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartsService, Cart } from '../../services/carts';

@Component({
  selector: 'app-carts',
  imports: [FormsModule, CommonModule],
  templateUrl: './carts.html',
  styleUrl: './carts.scss',
  standalone: true
})
export class Carts implements OnInit {
  filters = ['All', 'Active', 'Idle', 'Checkout', 'Abandoned'];
  selectedFilter = 'All';
  cartsList: Cart[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private cartsService: CartsService) {}

  ngOnInit() {
    this.cartsList = this.cartsService.getCarts();
  }

  get filteredCarts() {
    if (this.selectedFilter === 'All') return this.cartsList;
    return this.cartsList.filter(
      cart => cart.status.toLowerCase() === this.selectedFilter.toLowerCase()
    );
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
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

    get paginationInfo(): string {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(
      this.currentPage * this.itemsPerPage,
      this.totalItems
    );
    return `Showing ${startItem}-${endItem} of ${this.totalItems} products`;
  }

get totalItems(): number {
  return this.filteredCarts.length;
}

  /** Can navigate to previous page */
  get canGoBack(): boolean {
    return this.currentPage > 1;
  }

  /** Can navigate to next page */
  get canGoForward(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return this.currentPage < totalPages;
  }
}
