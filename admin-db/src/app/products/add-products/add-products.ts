import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './add-products.html',
  styleUrls: ['./add-products.scss']
})
export class AddProducts {
  constructor(private router: Router) {}

product = {
  name: '',
  price: 0,
  status: '',
  totalSales: 0
};

submitForm(event: Event) {
  event.preventDefault();
  console.log('Product Data:', this.product);
  // TODO: send to API or service
  this.router.navigate(['/']);
}

  cancel() {
    this.router.navigate(['/']);
  }
}
