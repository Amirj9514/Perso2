import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RolesService } from '../../../Shared/services/roles.service';
import { SharedService } from '../../../Shared/services/shared.service';
@Component({
  selector: 'app-tab-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-sidebar.component.html',
  styleUrl: './tab-sidebar.component.scss'
})
export class TabSidebarComponent {
  @Output() activeTabEmitter: EventEmitter<number> = new EventEmitter<number>();
 sidebarNavItems: any[] = [
    {
      id:1,
      title: 'Prozessübersicht',  
    },
    {
      id:2,
      title: 'Persönliche Daten',

    },
    {
      id:3,
      title: 'Vertrag Perso 2',
 
    },
    {
      id:4,
      title: 'Dokumente',
    },
    {
      id:5,
      title:'Vorstellungsgesrpäch',
    },
    {
      id:6,
      title: 'Anerkennung',  
    },
    {
      id:7,
      title: '§81a',

    },
    {
      id:8,
      title: 'Urkunde',
 
    },
    {
      id:9,
      title: 'Unterkunft',
    },
    {
      id:10,
      title:'Integration',
    },
    {
      id:11,
      title: 'Buchhaltung',
    },
    {
      id:12,
      title:'Info DE',
    },
  ];

  activeTab:number= 1;

  constructor(
    private roleS: RolesService,
    private sharedS: SharedService,
    private router: Router,
  ) {}

  toggleTab(tab:any): void {
    if(tab.id === this.activeTab) return;
    this.activeTab = tab.id;
    this.activeTabEmitter.emit(tab.id);
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
