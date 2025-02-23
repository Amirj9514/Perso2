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
  activeRole:string = ''; 

  constructor(
    private commonS: CommonService,
    private sharedS: SharedService,
    private flagS: FlagsService,
    private rolesS:RolesService,
    private toastS: CustomToastService
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
        if (response.status === 200) {
          const data: any = response?.body?.applications ?? [];

          this.products = data.map((item: any) => {
            return {
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
              vacancieName: this.getVacancieById(item.vacancy_id),
            };
          });
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
          console.log('error', error);
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
    const vacance = this.vacancies.find(
      (item) => item.id === product.vacancy_id
    );

    const dob = new Date(product.date_of_birth);

    this.newApplicationFrom.patchValue({
      appledDate: product.applied_at,
      enrollment: vacance,
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
    });
  }
}
