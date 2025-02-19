import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sidebarNavItems:any[] = [
    {
      title: 'Applications',
      icon: 'pi-chart-pie',
      link: '/',
    },
    {
      title: 'Vacancies',
      icon: 'pi-users',
      link: '/vacancies',
    },
    // {
    //   title: 'Applications',
    //   icon: 'pi-user',
    //   link: '/applications',
    // },
    {
      title: 'Employees',
      icon: 'pi-users',
      link: '/employees',
    },
    // {
    //   title: 'Payroll',
    //   icon: 'pi-users',
    //   link: '/payroll',
    // },
    {
      title: 'Calendar',
      icon: 'pi-calendar',
      link: '/calendar',
    },
  ];

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
