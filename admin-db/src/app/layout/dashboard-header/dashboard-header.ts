import { Component, EventEmitter, Output } from '@angular/core';

export interface Tab {
  key: string;
  label: string;
}

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.scss'],
})
export class DashboardHeader {
  @Output() tabChanged = new EventEmitter<string>();
  @Output() exportClicked = new EventEmitter<void>();
  @Output() addProductClicked = new EventEmitter<void>();

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
    this.exportClicked.emit();
    console.log('Export clicked');
  }

  onAddProduct(): void {
    this.addProductClicked.emit();
    console.log('Add Product clicked');
  }

}
