import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.html',
  styleUrls: ['./add-products.scss'],
  imports: [FormsModule, RouterModule],
})
export class AddProducts {
  newProduct: Partial<Product> = {
    name: '',
    status: 'draft',
    price: 0,
    totalSales: 0,
    createdAt: new Date().toLocaleDateString(),
    image: 'https://placehold.co/40x40',
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  editingProduct: Product | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        const product = this.productService.getProductById(+productId);
        if (product) {
          this.editingProduct = product;
          this.newProduct = { ...product };
        }
      } else {
        this.resetForm(); // normal add mode
      }
    });
  }

  submitForm(event: Event) {
    event.preventDefault();

    if (this.editingProduct) {
      // Update existing product
      this.productService.updateProduct(this.newProduct as Product);
      this.productService.stopEditing();
    } else {
      // Add new product
      this.productService.addProduct(this.newProduct as Product);
    }

    this.router.navigate(['/inventory']);
  }

  get submitButtonText(): string {
    return this.editingProduct ? 'Update Product' : 'Add Product';
  }

  private resetForm() {
    this.newProduct = {
      name: '',
      status: 'draft',
      price: 0,
      totalSales: 0,
      createdAt: new Date().toLocaleDateString(),
      image: 'https://placehold.co/40x40',
    };
  }

  cancelForm() {
    this.router.navigate(['/inventory']);
  }
}
