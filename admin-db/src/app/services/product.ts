import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
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
  private readonly STORAGE_KEY = 'products';

  private productsSubject = new BehaviorSubject<Product[]>(this.loadProducts());
  products$ = this.productsSubject.asObservable();

  constructor() {}

  private loadProducts(): Product[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Default data
    return [];
  }

  private saveProducts(products: Product[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  private editingProductSubject = new BehaviorSubject<Product | null>(null);
  editingProduct$ = this.editingProductSubject.asObservable();

  startEditing(product: Product) {
    this.editingProductSubject.next(product);
  }

  stopEditing() {
    this.editingProductSubject.next(null);
  }

  updateProduct(updated: Product) {
    const current = this.productsSubject.getValue();
    const index = current.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      current[index] = { ...updated };
      this.productsSubject.next([...current]);
      this.saveProducts(current);
    }
  }

  getProductById(id: number): Product | undefined {
    return this.productsSubject.getValue().find((p) => p.id === id);
  }
  addProduct(product: Product) {
    const current = this.productsSubject.getValue();
    const newProduct = { ...product, id: current.length + 1 };
    const updated = [...current, newProduct];

    this.productsSubject.next(updated);
    this.saveProducts(updated); // ✅ persist to localStorage
  }

  deleteProduct(id: number) {
    const current = this.productsSubject.getValue();
    const updated = current.filter((product) => product.id !== id);

    this.productsSubject.next(updated);
    this.saveProducts(updated); // persist the change
  }
}
