import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() selectedItem = new EventEmitter<string>();
  selectedNavItem: string = 'Dashboard';

  setActiveNavItem(navItem: string) {
    this.selectedNavItem = navItem;
    this.selectedItem.emit(navItem)
  }
}
