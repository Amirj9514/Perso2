import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
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
import { ViewDetailComponent } from "./view-detail/view-detail.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
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
    ViewDetailComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
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

  viewDetails: boolean = true;
  vacancieName:string = ''

  constructor(
    private commonS: CommonService,
    private sharedS: SharedService,
    private flagS: FlagsService
  ) {
    this.newApplicationFrom = new FormGroup({
      appledDate: new FormControl('', [Validators.required]),
      enrollment: new FormControl(null, [Validators.required]),
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
    });

    this.maritalStatus = this.commonS.getMaritalStatusList();
    this.countryList = this.flagS.getFlagsList();
  }

  ngOnInit(): void {
    this.getVacancies();
    this.getApplicantDetails();
  }

  onSubmit(): void {
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched(); // Ensure all validation errors appear
      return;
    }

    const formValue = this.newApplicationFrom.value;
    const apiParam = {
      applied_at: formValue.appledDate ?? '',
      vacancy_id: formValue.enrollment?.id ?? '',
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
    };
    this.formSubmit = true;


    this.sharedS.sendPostRequest('applications', apiParam).subscribe({
      next: (response) => {
        this.formSubmit = false;
        if (response.status === 200) {
          this.getApplicantDetails();
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

    console.log('product', product);
    
  }

  getApplicantDetails(): void {
    const url = `applications`;
    this.products = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
    this.applicantsLoader = true;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (response) => {
        this.applicantsLoader = false;
        if (response.status === 200) {
          this.products = response?.body?.applications ?? [];
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
  getVacancies(): void {
    // ?first_name=${''}&last_name=${''}&email=${''}&user_name=${''}'
    const url = `vacancies`;
    this.getApiLoader = true;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (response) => {
        this.getApiLoader = false;
        if (response.status === 200) {
          this.vacancies = response?.body?.vacancies ?? [];
        } else {
          this.products = [];
        }
      },
      error: (error) => {
        this.vacancies = [];
        this.getApiLoader = false;
      },
    });
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

  deleteUser(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.sharedS.sendDeleteRequest(`applications/${id}`).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.getApplicantDetails();
          }
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }

  onAccept(): void {
    this.deleteLoader = true;
    this.sharedS.sendDeleteRequest(`applications/${this.selectedRow.id}`).subscribe({
      next: (response) => {
        this.deleteLoader = false;
        if (response.status === 200) {
          this.products.findIndex((item, index) => {
            if (item.id === this.selectedRow.id) {
              this.products.splice(index, 1);
              this.showDialoag = false
              this.selectedRow = null;
              return;
            }
          });
        }
      },
      error: (error) => {
        this.deleteLoader = false;
        console.log('error', error);
      },
    });
  }


  viewDetail(product:any){
    this.selectedRow = product;
    this.viewDetails = true;
    this.visible = true;
    this.vacancieName = this.getVacancieById(this.selectedRow.vacancy_id)
  }
}
