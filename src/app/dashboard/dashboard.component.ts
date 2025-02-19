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

  constructor(
    private commonS: CommonService,
    private sharedS: SharedService,
    private flagS: FlagsService
  ) {
    this.newApplicationFrom = new FormGroup({
      appledDate: new FormControl(this.todayDate, [Validators.required]),
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
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
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
      applied_at: formValue.appledDate,
      vacancy_id: formValue.enrollment?.id,
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      age: formValue.age,
      address: formValue.address,
      marital_status: formValue.maritalStatus?.name ?? '',
      date_of_birth: formValue.dob,
      // profession: formValue.profession,
      country: formValue.country.name,
      description: formValue.description,
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
    const confirmDelete = confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
      this.products = this.products.filter((p) => p !== product);
    }
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
}
