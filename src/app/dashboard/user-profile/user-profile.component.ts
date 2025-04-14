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
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FileService } from '../../Shared/services/file.service';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';

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
     DrawerModule,
     ButtonModule,
     DialogModule,
     FloatLabelModule,
     ReactiveFormsModule,
     CommonModule,
     EditorModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  activeTab: number = 1;
  applicant: any;
  documentList: any[] = [];
  userDetail: any = null;
  selectedFiles: any[] = [];

  visible: boolean = false;
  emailDialog: boolean = false;
  emailLoader: boolean = false;

  categoory: string = 'healthcare';
  private applicantSubscription!: Subscription;
  private selectedFilesSubscription!: Subscription;

  emailForm!:FormGroup;
  formSubmit: boolean = false;

  
  constructor(
    private applicantS: ApplicantService,
    private router: Router,
    private sharedS: SharedService,
    private toastS: CustomToastService,
    private roleS: RolesService,
    private fileS: FileService,
  ) {
    this.emailForm = new FormGroup({
      subject: new FormControl('' , [Validators.required]),
      message: new FormControl('', [Validators.required]),
      email: new FormControl('' , [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.applicantSubscription = this.applicantS
      .getSelectedApplicant()
      .subscribe((data: any) => {
        if (!data) {
          this.goBack();
          return;
        }
        this.applicant = data;
        if (data.sub_category) {
          const sub_category = JSON.parse(data.sub_category);
          const cat = sub_category.subCatId;
          const parts = cat.split('_');
          this.categoory = parts[0] ?? 'healthcare';
        }
      });

      this.applicantS.getDocumentList().subscribe((data:any)=>{
        this.documentList = data ?? [];
      })
    this.userDetail = this.roleS.getLoginUser() ?? null;
    this.getApplicantFileList();
    this.getSelectedFiles();
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

  getSelectedFiles(){
    this.selectedFilesSubscription = this.fileS.getGroupedFiles().subscribe((data:any)=>{
      if(data && data.length > 0){
        this.selectedFiles =data;
      }else{
        this.selectedFiles = [];
      }
    })
  }

  toggleTab(event: number) {
    this.activeTab = event;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  closeCallback(event: any) {
    this.visible = false;
  }

  downloadFile(file: any) {
    const url = `application-documents/${file.id}/file`;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          // const fileUrl = res.body.url;
          // window.open(fileUrl, '_blank');
        }
      },
      error: (err: any) => {
        this.toastS.setToast({
          show: true,
          severity: 'error',
          message: 'Error in downloading file.',
        });
      },
    });
  }
  deleteFileHandler(applicant: any , file: any) {

    this.fileS.filterFiles(file, applicant.applicant);
  }

  calFileSize(fileSizeInBytes: number) {
    if (!fileSizeInBytes) return '0 KB';
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;

    let formattedSize =
      fileSizeInMB >= 1
        ? `${fileSizeInMB.toFixed(2)} MB`
        : `${fileSizeInKB.toFixed(2)} KB`;

    return formattedSize;
  }


  sendEmail(){
    this.formSubmit = true;
    if(this.emailForm.invalid){
      return;
    }

    const ids = this.selectedFiles.map((applicant:any)=>{
      if(applicant.files && applicant.files.length > 0){
        return applicant.files.map((file:any)=>{
          return file.id;
        })
      }
    })

    const data = {
      from: "asad@gmail.com",
      to:  this.emailForm.value.email,
      subject: this.emailForm.value.subject,
      body: this.emailForm.value.message,
      document_ids:ids.length? ids.join(','):'',
    };

    this.emailLoader = true;
    const url = 'application-documents/mail';
    this.sharedS.sendPostRequest(url, data).subscribe({
      next: (res:any)=>{
        this.emailLoader = false;
        if(res.status === 200){
          this.toastS.setToast({
            show: true,
            severity: 'success',
            message: 'Email sent successfully',
          });
          this.visible = false;
          this.emailForm.reset();
          this.formSubmit = false;
          this.emailDialog = false;
        }else{
          this.toastS.setToast({
            show: true,
            severity: 'error',
            message: 'Error in sending email',
          });
        }
      },
      error: (err:any)=>{
        this.emailLoader = false;
          this.emailDialog = false;
        this.toastS.setToast({
          show: true,
          severity: 'error',
          message: 'Error in sending email',
        });
      }
    })
  }

  selectAllFiles(){
    this.fileS.selectAllFiles(this.documentList , this.applicant);
  }

  unselectAllFiles(){
    this.fileS.unSelectAllFiles(this.documentList , this.applicant);
  }

  showBtn(){
    const selectedFilesLength = this.fileS.getfileListLength(this.applicant);
    const length = this.documentList.length;

    let isAdded = true;
    if(selectedFilesLength >= length){
      isAdded = false;
    }
    return isAdded;
  }

  ngOnDestroy() {
    if (this.applicantSubscription) {
      this.applicantSubscription.unsubscribe();
    }

    if(this.selectedFilesSubscription){
      this.selectedFilesSubscription.unsubscribe();
    } 
  }
}
