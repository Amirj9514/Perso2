import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApplicantsComponent } from './applicants/applicants.component';
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { VacanciesComponent } from "./vacancies/vacancies.component";
import { PayRollComponent } from "./pay-roll/pay-roll.component";
import { EmployeesComponent } from "./employees/employees.component";
import { CalenderComponent } from "./calender/calender.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterModule,
    TableModule,
    TagModule,
    ApplicantsComponent,
    DashBoardComponent,
    VacanciesComponent,
    PayRollComponent,
    EmployeesComponent,
    CalenderComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
item: string="Dashboard";
  ngOnInit() {}

  selectedNavItem(item: string) {
    this.item=item;
  }
}
