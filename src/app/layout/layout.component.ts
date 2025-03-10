import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { RolesService } from '../Shared/services/roles.service';
import { RouteTrackerService } from '../Shared/services/route-tracker.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent , RouterModule , CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isApplicent:boolean = false;
  user:any = {
    name: 'N/A',
    role: 'N/A',
    firstLetter:'N/A',
  };
  constructor(private roleS:RolesService , private routerTrakerS:RouteTrackerService) { }
  ngOnInit(): void {
    this.getloginRole()
    this.routerTrakerS.currentRoute$.subscribe((route) => {
      const url = route; 
        this.isApplicent = url.includes('applicant');        
    });
  }

  getloginRole(){
    const user = this.roleS.getLoginUser();
    this.user = {
      name: (user?.first_name + " " + user?.last_name),
      role: user.role ?? 'N/A',
      firstLetter:this.returnFirstLetter(user),
    }
  }


  returnFirstLetter(user: any): string {
    const first = user.first_name.charAt(0);
    const second = user.last_name.charAt(0);
    return first+second
  }
}
