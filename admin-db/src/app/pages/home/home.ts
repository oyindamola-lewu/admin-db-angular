import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddProducts } from '../../products/add-products/add-products';
import { ProductService } from '../../services/product';
import { CartsService } from '../../services/carts';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  kpiMetrics: any[] = [];
  topProducts: { name: string; totalSales: number }[] = [];
  alertsList = [
    'AirPods Pro stock low (5 left)',
    '3 carts abandoned in the last hour',
    '2 orders pending shipment'
  ];
constructor(
  private productsService: ProductService,
  private cartsService: CartsService
) {}

  ngOnInit() {
    this.loadKPIs();
    this.calculateTopProducts();
  }

  loadKPIs() {
    const totalRevenue = this.productsService.getTotalRevenue();
    const activeCarts = this.cartsService.getActiveCartsCount();
    const abandonedCarts = this.cartsService.getAbandonedCartsCount();

    this.kpiMetrics = [
      { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, trend: 'positive' },
      { title: "Active Carts", value: activeCarts.toString(), trend: 'neutral' },
      { title: "Orders Pending", value: '12', trend: 'neutral' },
      { title: "Abandoned Carts", value: abandonedCarts.toString(), trend: abandonedCarts > 0 ? 'negative' : 'neutral' },
    ];
  }

  /** Calculate the top products by totalSales */
calculateTopProducts() {
  const products = this.productsService.getProducts();
  this.topProducts = products
    .map(p => ({ name: p.name, totalSales: p.totalSales }))
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);
}
}
