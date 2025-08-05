import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product';
export interface Tab {
  key: string;
  label: string;
}

@Component({
  imports: [RouterModule],
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.scss'],
})
export class DashboardHeader {
  constructor(private productService: ProductService) {}

  @Output() tabChanged = new EventEmitter<string>();
  @Output() exportClicked = new EventEmitter<void>();

  onFilterTabClick(status: string) {
    this.tabChanged.emit(status);
  }

  activeTab: string = 'all';

  tabs: Tab[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'draft', label: 'Draft' },
    { key: 'archived', label: 'Archived' },
  ];

  setActiveTab(tabKey: string): void {
    this.activeTab = tabKey;
    this.tabChanged.emit(tabKey);
  }

  onExport(): void {
    this.productService.products$
      .subscribe((products) => {
        const csvContent = this.generateCSV(products);
        this.downloadCSV(csvContent, 'products.csv');
      })
      .unsubscribe(); 
  }

  private generateCSV(products: Product[]): string {
    if (!products || products.length === 0) return '';

    const headers = Object.keys(products[0]).join(',');
    const rows = products.map((p) =>
      Object.values(p)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')
    );

    return [headers, ...rows].join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
