import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { SvgIconDirective } from '../../../Shared/directives/svg-icon.directive';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [DividerModule, AvatarModule, TooltipModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
