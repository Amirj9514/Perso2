import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { RolesService } from '../Shared/services/roles.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent , RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  user:any = {
    name: 'N/A',
    role: 'N/A',
    firstLetter:'N/A',
  };
  constructor(private roleS:RolesService) { }

  ngOnInit(): void {
    this.getloginRole();
  }

  getloginRole(){
    const user = this.roleS.getLoginUser();
    this.user = {
      name: (user?.first_name + " " + user?.last_name),
      role: user.role ?? 'N/A',
      firstLetter:this.returnFirstLetter(user.first_name) + this.returnFirstLetter(user.last_name),
    }
  }


  returnFirstLetter(name: string): string {
    return name.charAt(0);
  }
}
