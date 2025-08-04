import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
  imports: [RouterModule],
})
export class ProductListComponent implements OnInit {
  @Input() selectedStatusFilter: string | null = null;
@Input() searchQuery: string = '';
  products: Product[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private productService: ProductService, private router: Router) {}

editProduct(productId: number) {
  this.router.navigate(['/add-products', productId]); // navigate with ID
  this.closeMenu();
}

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }
  get totalItems(): number {
    if (!this.selectedStatusFilter || this.selectedStatusFilter === 'all') {
      return this.products.length;
    }
    return this.products.filter(
      (p) => p.status.toLowerCase() === this.selectedStatusFilter?.toLowerCase()
    ).length;
  }

  get filteredProducts(): Product[] {
    return this.products.filter((product) => {
      const matchesStatus =
        !this.selectedStatusFilter ||
        this.selectedStatusFilter === 'all' ||
        product.status.toLowerCase() ===
          this.selectedStatusFilter.toLowerCase();

      const matchesSearch =
        !this.searchQuery ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
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
  // Track the product whose menu is open
  openMenuProductId: number | null = null;

  toggleMenu(productId: number) {
    if (this.openMenuProductId === productId) {
      this.closeMenu();
    } else {
      this.openMenuProductId = productId;
    }
  }

  closeMenu() {
    this.openMenuProductId = null;
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    this.closeMenu();
  }

  updateProduct(updated: Product) {
    this.productService.updateProduct(updated);
    this.closeMenu();
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.actions') && !target.closest('.dropdown-menu')) {
      this.closeMenu();
    }
  }
}
