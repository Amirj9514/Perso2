import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CommonService } from '../Shared/services/common.service';
import { SharedService } from '../Shared/services/shared.service';

import { FlagsService } from '../Shared/services/flags.service';
import { SkeletonModule } from 'primeng/skeleton';
import { Dialog } from 'primeng/dialog';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { RolesService } from '../Shared/services/roles.service';
import { CustomToastService } from '../Shared/services/custom-toast.service';
import { Router } from '@angular/router';
import { ApplicantService } from '../Shared/services/applicant.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    CommonModule,
    TableModule,
    DrawerModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    SkeletonModule,
    Dialog,
    ViewDetailComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;
  products: any[] = [];
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;
  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  cities: any[] = [];
  formSubmit: boolean = false;
  getApiLoader: boolean = false;
  applicantsLoader: boolean = false;
  vacancies: any[] = [];
  maritalStatus: any[] = [];
  countryList: any[] = [];
  selectedRow: any = null;
  showDialoag: boolean = false;
  deleteLoader: boolean = false;

  viewDetails: boolean = false;
  vacancieName: string = '';
  isEdit: boolean = false;
  activeRole: string = '';

  languagesLvl: any[] = [];
  enrollmentCategory: any[] = [];
  userDetail: any = null;
  onlyView: boolean = false;
  jobTypes: any[] = [];

  selectedSubCategory: any = null;

  constructor(
    private commonS: CommonService,
    private sharedS: SharedService,
    private flagS: FlagsService,
    private rolesS: RolesService,
    private toastS: CustomToastService,
    private router: Router,
    private applicantS: ApplicantService
  ) {
    this.newApplicationFrom = new FormGroup({
      appledDate: new FormControl('', [Validators.required]),
      enrollment: new FormControl(null, [Validators.required]),
      sub_category: new FormControl(null, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      description: new FormControl(''),

      // additional fields
      status: new FormControl(''),
      qualification: new FormControl(''),
      numOfChildren: new FormControl(''),
      occupation: new FormControl(''),
      fsb: new FormControl(''),
      jobType: new FormControl(null),
      approval: new FormControl(''),
      applicationNo: new FormControl(''),
      visa: new FormControl(''),
      startofWork: new FormControl(''),
      contractCadidate: new FormControl(''),
      dateOfContract: new FormControl(''),
      employerContact: new FormControl(''),
      certification: new FormControl(''),
      langLvl: new FormControl(null),
    });

    this.maritalStatus = this.commonS.getMaritalStatusList();
    this.countryList = this.flagS.getFlagsList();
    this.languagesLvl = this.commonS.getLanguagesLvl();
    this.jobTypes = this.commonS.getJobTypes();
    this.enrollmentCategory = this.commonS.getEnrollmentCategories();
  }

  ngOnInit(): void {
    this.userDetail = this.rolesS.getLoginUser() ?? null;
    if(this.userDetail.role === 'viewer') {
      this.onlyView = true;
    }
    this.getVacancies();

    const roles = this.rolesS.getLoginUser();
    this.activeRole = roles?.role ?? '';
  }

  handelSearch(event: any) {
    const value = event.target.value;
    this.dt2.filterGlobal(value, 'contains');
  }

  onSubmit(): void {
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched(); // Ensure all validation errors appear
      return;
    }

    const formValue = this.newApplicationFrom.value;

    const additionalData = {
      status: formValue.status,
      qualification: formValue.qualification,
      numOfChildren: formValue.numOfChildren,
      occupation: formValue.occupation,
      fsb: formValue.fsb,
      jobType: formValue.jobType,
      approval: formValue.approval,
      applicationNo: formValue.applicationNo,
      visa: formValue.visa,
      startofWork: formValue.startofWork,
      contractCadidate: formValue.contractCadidate,
      dateOfContract: formValue.dateOfContract,
      employerContact: formValue.employerContact,
      certification: formValue.certification,
      langLvl: formValue.langLvl,
    };

    const jsonString = JSON.stringify(additionalData);

    const apiParam = {
      applied_at: formValue.appledDate ?? '',
      vacancy_id: 7,
      first_name: formValue.firstName ?? '',
      last_name: formValue.lastName ?? '',
      email: formValue.email ?? '',
      phone: formValue.phone ?? '',
      age: formValue.age ?? '',
      address: formValue.address ?? '',
      marital_status: formValue.maritalStatus?.name ?? '',
      date_of_birth: formValue.dob ?? '',
      // profession: formValue.profession,
      country: formValue.country.name ?? '',
      description: formValue.description ?? '',
      additional_data: jsonString,
      sub_category: JSON.stringify({
        catId: formValue.enrollment?.id ?? '',
        cat_name: formValue.enrollment?.name ?? '',
        subCatId: formValue.sub_category?.id ?? '',
        sub_cat_name: formValue.sub_category?.name ?? '',
      }),
    };
    this.formSubmit = true;
    let url = `applications`;
    if (this.isEdit) {
      url = `applications/${this.selectedRow.id}`;

      this.sharedS.sendPutRequest(url, apiParam).subscribe({
        next: (response) => {
          this.formSubmit = false;
          if (response.status === 200) {
            this.getApplicantDetails();
            this.visible = false;

            this.toastS.setToast({
              show: true,
              message: 'Datensatz erfolgreich hinzugefügt',
            });
          }
        },
        error: (error) => {
          this.formSubmit = false;
        },
      });

      return;
    }

    this.sharedS.sendPostRequest(url, apiParam).subscribe({
      next: (response) => {
        this.formSubmit = false;
        if (response.status === 200) {
          this.getApplicantDetails();
          this.toastS.setToast({
            show: true,
            message: 'Datensatz erfolgreich aktualisiert',
          });
          this.visible = false;
        }
      },
      error: (error) => {
        this.formSubmit = false;
      },
    });
  }

  onDelete(product: any): void {
    this.selectedRow = product;
    this.showDialoag = true;
  }

  getApplicantDetails(): void {
    const url = `applications`;
    this.products = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
    this.applicantsLoader = true;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (response) => {
        this.applicantsLoader = false;
        this.products = [];
        if (response.status === 200) {
          const data: any = response?.body?.applications ?? [];

          data.map((item: any) => {
            let category = null;
            if (item.sub_category) {
              category = JSON.parse(item.sub_category);
            }
            const val = {
              id: item.id,
              applied_at: item.applied_at,
              vacancy_id: item.vacancy_id,
              first_name: item.first_name,
              last_name: item.last_name,
              email: item.email,
              phone: item.phone,
              age: item.age,
              address: item.address,
              marital_status: item.marital_status,
              date_of_birth: item.date_of_birth,
              country: item.country,
              description: item.description,
              sub_category: item.sub_category,
              category: category,
              vacancieName: this.getVacancieById(item.vacancy_id),
              additional_data: item.additional_data,
              tab1_parse:this.parseData(item.tab_1),
              tab_1: item.tab_1,
              tab_2: item.tab_2,
              tab_3: item.tab_3,
              tab_4: item.tab_4,
              tab_5: item.tab_5,
              tab_6: item.tab_6,
              tab_7: item.tab_7,
              tab_8: item.tab_8,
              tab_9: item.tab_9,
              tab_10: item.tab_10,
              tab_11: item.tab_11,
            };

            if (this.userDetail.role === 'viewer') {
              if (val.applied_at === this.userDetail.company) {
                this.products.push(val);
              }
            } else {
              this.products.push(val);
            }
          });

          console.log(this.products[this.products.length - 1]); 
          
        } else {
          this.products = [];
        }
      },
      error: (error) => {
        this.products = [];
        this.applicantsLoader = false;
      },
    });
  }


  parseData(item:any){
    if(!item) return null;
    try {
      const parsedData = JSON.parse(item);
      return parsedData;
    } catch (error) {
      return null; // or handle the error as needed
    }
  }
  getVacancies(): void {
    // ?first_name=${''}&last_name=${''}&email=${''}&user_name=${''}'
    const url = `vacancies`;
    this.getApiLoader = true;
    this.applicantsLoader = true;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (response) => {
        this.getApiLoader = false;
        if (response.status === 200) {
          this.vacancies = response?.body?.vacancies ?? [];
          this.getApplicantDetails();
        } else {
          this.products = [];
          this.applicantsLoader = false;
        }
      },
      error: (error) => {
        this.vacancies = [];
        this.applicantsLoader = false;
        this.getApiLoader = false;
      },
    });
  }

  getCategoryById(id: number) {
    let selectedEnrolment: any = null;
    for (const enrollment of this.enrollmentCategory) {
      if (enrollment.id === id) {
        selectedEnrolment = enrollment;
        break;
      }
    }

    return selectedEnrolment;
  }


  getTdValue(item: any, key: string) {
    let retVal:{ color:string , show:boolean} = { color:'' , show:false};

    try {
      if(item.tab1_parse[key]){
        retVal.color = item.tab1_parse[key].color ?? 'black';
        retVal.show = item.tab1_parse[key].color?true : false;
  
        return retVal;
      }
      return {color:'', show:false};
    } catch (error) {
      return {color:'', show:false};
    }
   
  }

  getSubcategoryById(id: any) {
    let selectedSubCategory: any = null;
    for (const subCategory of this.selectedSubCategory) {
      if (subCategory.id === id) {
        selectedSubCategory = subCategory;
        break;
      }
    }
    return selectedSubCategory;
  }

  getVacancieById(id: number) {
    if (!id) return 'N/A';
    for (const vacance of this.vacancies) {
      if (vacance.id === id) {
        return vacance.role ?? 'N/A';
      }
    }
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  onAccept(): void {
    this.deleteLoader = true;
    this.sharedS
      .sendDeleteRequest(`applications/${this.selectedRow.id}`)
      .subscribe({
        next: (response) => {
          this.deleteLoader = false;
          if (response.status === 200) {
            this.products.findIndex((item, index) => {
              if (item.id === this.selectedRow.id) {
                this.products.splice(index, 1);
                this.showDialoag = false;
                this.selectedRow = null;
                this.toastS.setToast({
                  show: true,
                  message: 'Datensatz erfolgreich gelöscht',
                });
                return;
              }
            });
          }
        },
        error: (error) => {
          this.deleteLoader = false;
        },
      });
  }

  viewDetail(product: any) {
    this.selectedRow = product;
    this.viewDetails = true;
    this.visible = true;
    this.vacancieName = this.getVacancieById(this.selectedRow.vacancy_id);
  }

  editDetail(product: any) {

    this.viewDetails = false;

    this.isEdit = true;
    this.visible = true;
    this.selectedRow = product;
    const category = this.selectedRow.category;

    const selectedEnrol = this.getCategoryById(category.catId);
    this.selectedSubCategory = selectedEnrol?.subCategories ?? [];
    const selectedSubCategory = this.getSubcategoryById(category.subCatId);

    const dob = new Date(product.date_of_birth);
    const additionalData = product.additional_data
      ? JSON.parse(product.additional_data)
      : {};
    this.newApplicationFrom.patchValue({
      appledDate: product.applied_at,
      enrollment: selectedEnrol,
      sub_category: selectedSubCategory,
      firstName: product.first_name,
      lastName: product.last_name,
      email: product.email,
      phone: product.phone,
      age: product.age,
      address: product.address,
      maritalStatus: this.maritalStatus.find(
        (item) => item.name === product.marital_status
      ),
      country: this.countryList.find((item) => item.name === product.country),
      dob: dob,
      description: product.description,
      ...additionalData,
    });
  }

  openDetail(row: any) {
    this.applicantS.updateSelectedApplicant(row);
    this.router.navigateByUrl(`/applicant/${row.id}`);
  }

  onEnrollmentChange(event: any) {
    this.selectedSubCategory = event?.subCategories ?? [];
  }
}
