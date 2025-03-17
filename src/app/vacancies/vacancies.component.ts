import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
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
import { FlagsService } from '../Shared/services/flags.service';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Shared/services/shared.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CustomToastService } from '../Shared/services/custom-toast.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Dialog } from 'primeng/dialog';
import { CommonService } from '../Shared/services/common.service';
@Component({
  selector: 'app-vacancies',
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
    TextareaModule,
    SkeletonModule,
    IconFieldModule,
    InputIconModule,
    Dialog,
  ],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;
  products: any[] = [];
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  newApplicationFrom!: FormGroup;
  flags: any[] = [];
  enrollmentList: any[] = [];
  subCategoryList: any[] = [];
  formSubmit: boolean | undefined;
  getApiLoader: boolean = false;
  selectedRow: any = null;
  showDialoag: boolean = false;
  deleteLoader: boolean = false;

  constructor(
    private flagS: FlagsService,
    private sharedS: SharedService,
    private toastS: CustomToastService,
    private commonS:CommonService
  ) {
    this.newApplicationFrom = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      company: new FormControl(''),
      country: new FormControl(null),
      description: new FormControl(null),
    });

    this.enrollmentList  = this.commonS.getEnrollmentCategories();
  }

  ngOnInit(): void {
    this.flags = this.flagS.getFlagsList();
    this.getVacancies();
  }

  handelSearch(event: any) {
    const value = event.target.value;
    this.dt2.filterGlobal(value, 'contains');
  }

  getVacancies(): void {
    // ?first_name=${''}&last_name=${''}&email=${''}&user_name=${''}'
    const url = `vacancies`;
    this.products = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
    this.getApiLoader = true;
    this.sharedS.sendGetRequest(url).subscribe({
      next: (response) => {
        this.getApiLoader = false;
        if (response.status === 200) {
          this.products = response?.body?.vacancies ?? [];
        } else {
          this.products = [];
        }
      },
      error: (error) => {
        this.products = [];
        this.getApiLoader = false;
      },
    });
  }

  onSubmit(): void {
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched();
      return;
    }

    const formValue = this.newApplicationFrom.value;

    const apiParam = {
      ...formValue,
      
      title: JSON.stringify(formValue?.role) ?? '',
      category: formValue?.role.name ?? '',
      role: formValue?.company.name ?? '',
      location: formValue?.country?.name ?? '',
      description: JSON.stringify(formValue?.company) ?? '',
    };
    this.formSubmit = true;

    this.sharedS.sendPostRequest('vacancies', apiParam).subscribe({
      next: (response) => {
        this.formSubmit = false;
        if (response.status === 200) {
          this.getVacancies();
          this.newApplicationFrom.reset();
          this.visible = false;
          this.toastS.setToast({
            show: true,
            message: 'Datensatz erfolgreich hinzugefügt',
            severity: 'success',
          });
        }
      },
      error: (error) => {
        this.formSubmit = false;
        this.visible = false;
        console.log('error', error);
      },
    });
  }

  deleteRole(product: any): void {
    this.selectedRow = product;
    this.showDialoag = true;
  }

  onAccept(): void {
    this.sharedS
      .sendDeleteRequest(`vacancies/${this.selectedRow.id}`)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.selectedRow = null;
            this.showDialoag = false;
            this.getVacancies();
            this.toastS.setToast({
              show: true,
              message: 'Datensatz erfolgreich gelöscht',
              severity: 'success',
            });
          }
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  onEnroolmentChange(event: any): void {
    this.subCategoryList = event?.subCategories ?? []; 
  }
}
