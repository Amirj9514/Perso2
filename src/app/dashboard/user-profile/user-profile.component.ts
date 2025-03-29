import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { TabSidebarComponent } from './tab-sidebar/tab-sidebar.component';
import { ProzessubersichtComponent } from './prozessubersicht/prozessubersicht.component';
import { VertragPerso2Component } from './vertrag-perso2/vertrag-perso2.component';
import { DokumenteComponent } from './dokumente/dokumente.component';
import { AnerkennungComponent } from './anerkennung/anerkennung.component';
import { UrkundeComponent } from './urkunde/urkunde.component';
import { UnterkunftComponent } from './unterkunft/unterkunft.component';
import { IntegrationComponent } from './integration/integration.component';
import { PersonlicheDatenComponent } from './personliche-daten/personliche-daten.component';
import { VorstellungsgesrpachComponent } from './vorstellungsgesrpach/vorstellungsgesrpach.component';
import { S81aComponent } from './s81a/s81a.component';
import { BuchhaltungComponent } from './buchhaltung/buchhaltung.component';
import { InfoDeComponent } from './info-de/info-de.component';
import { ApplicantService } from '../../Shared/services/applicant.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../Shared/services/shared.service';
import { CustomToastService } from '../../Shared/services/custom-toast.service';
import { RolesService } from '../../Shared/services/roles.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    TabsModule,
    TabSidebarComponent,
    ProzessubersichtComponent,
    VertragPerso2Component,
    DokumenteComponent,
    AnerkennungComponent,
    UrkundeComponent,
    UnterkunftComponent,
    IntegrationComponent,
    PersonlicheDatenComponent,
    VorstellungsgesrpachComponent,
    S81aComponent,
    BuchhaltungComponent,
    InfoDeComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  activeTab: number = 1;
  applicant: any;
  documentList: any[] = [];
  userDetail: any = null;

  categoory:string = 'healthcare';
  private applicantSubscription!: Subscription;
  constructor(
    private applicantS: ApplicantService,
    private router: Router,
    private sharedS: SharedService,
    private toastS: CustomToastService,
    private roleS: RolesService,
  ) {}

  ngOnInit(): void {
    this.applicantSubscription = this.applicantS
   
      .getSelectedApplicant()
      .subscribe((data: any) => {
        if (!data) {
          this.goBack();
          return;
        }
        this.applicant = data;

        if(data.sub_category){
          const sub_category = JSON.parse(data.sub_category);
          const cat = sub_category.subCatId;
          const parts = cat.split("_");
          this.categoory = parts[0] ?? 'healthcare';
        }        
      });
      this.userDetail = this.roleS.getLoginUser() ?? null;
    this.getApplicantFileList();
  }

  getApplicantFileList() {
    const url = `application-documents?application_id=${this.applicant.id}`;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.documentList = res?.body?.application_documents ?? []; 
          this.applicantS.updateDocumentList(this.documentList);
        }
      },
      error: (err: any) => {
        this.toastS.setToast({
          severity: 'error',
          show: true,
          message: 'Error while fetching applicant documents',
        });
      },
    });
  }

  toggleTab(event: number) {
    this.activeTab = event;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.applicantSubscription) {
      this.applicantSubscription.unsubscribe();
    }
  }
}
