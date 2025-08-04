import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [FormsModule],
})
export class Header {
  searchQuery: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.searchChanged.emit(value);
  }
  @Output() profileClick = new EventEmitter<void>();

  constructor() {}

  onProfileClick(): void {
    this.profileClick.emit();
    console.log('Profile button clicked');
  }
}
