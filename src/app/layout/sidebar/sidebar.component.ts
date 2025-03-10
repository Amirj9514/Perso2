import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RolesService } from '../../Shared/services/roles.service';
import { SharedService } from '../../Shared/services/shared.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  sidebarNavItems: any[] = [
    {
      title: 'Kandidaten',
      icon: 'pi-chart-pie',
      link: '/',
      role: ['admin', 'agent'],
    },
    {
      title: 'Positionen',
      icon: 'pi-users',
      link: '/vacancies',
      role: ['admin', 'agent'],
    },
    {
      title: 'Mitarbeiter',
      icon: 'pi-users',
      link: '/employees',
      role: ['admin'],
    },
    {
      title: 'Calendar',
      icon: 'pi-calendar',
      link: '/calendar',
      role: ['admin', 'agent'],
    },
  ];

  dropdownOpen = false;

  constructor(
    private roleS: RolesService,
    private sharedS: SharedService,
    private router: Router,
  ) {}

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  isAllowed(nav: any): boolean {
    const role = this.roleS.getRoles();
    if (nav.role.includes(role)) {
      return true;
    }
    return false;
  }

  logout() {
    this.sharedS.insertData({ key: 'token', val: null });
    this.router.navigateByUrl('/login');
  }
}
