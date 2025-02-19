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
import { FlagsService } from '../Shared/services/flags.service';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Shared/services/shared.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CustomToastService } from '../Shared/services/custom-toast.service';
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
  ],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit {
  products: any[] = [];
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  newApplicationFrom!: FormGroup;
  flags: any[] = [];
  formSubmit: boolean | undefined;
  getApiLoader: boolean = false;

  constructor(
    private flagS: FlagsService,
    private sharedS: SharedService,
    private toastS: CustomToastService
  ) {
    this.newApplicationFrom = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      company: new FormControl('', [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.flags = this.flagS.getFlagsList();
    this.getVacancies();
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
      location: formValue.country.name,
      title: formValue.role,
      category: formValue.company,
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
            message: 'Vacancy added successfully',
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
    console.log('form', apiParam);
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
