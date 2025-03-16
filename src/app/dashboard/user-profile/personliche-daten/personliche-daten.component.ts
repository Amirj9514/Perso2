import { Component, Input, SimpleChanges } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonService } from '../../../Shared/services/common.service';
import { FlagsService } from '../../../Shared/services/flags.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../../Shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personliche-daten',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule,
    FieldsetModule,
    ButtonModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
  ],
  templateUrl: './personliche-daten.component.html',
  styleUrl: './personliche-daten.component.scss',
})
export class PersonlicheDatenComponent {
  @Input() applicant: any;
  maritalStatus: any[] = [];
  countryList: any[] = [];
  languagesLvl: any[] = [];
  vacancies: any[] = [];
  products: any[] = [];
  jobTypes: any[];
  newApplicationFrom!: FormGroup;
  formSubmit: boolean = false;
  getApiLoader: boolean = false;
  applicantsLoader: boolean = false;
  isEdit: boolean = false;

  constructor(
    private commonS: CommonService,
    private flagS: FlagsService,
    private sharedS: SharedService,
    private router: Router
  ) {
    this.newApplicationFrom = new FormGroup({
      appledDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      enrollment: new FormControl({ value: null, disabled: true }, [Validators.required]),
      firstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      lastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      phone: new FormControl({ value: '', disabled: true }, [Validators.required]),
      age: new FormControl({ value: '', disabled: true }, [Validators.required]),
      address: new FormControl({ value: '', disabled: true }, [Validators.required]),
      maritalStatus: new FormControl({ value: null, disabled: true }, [Validators.required]),
      country: new FormControl({ value: null, disabled: true }, [Validators.required]),
      dob: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl({ value: '', disabled: true }),

      // additional fields
      status: new FormControl({ value: '', disabled: true }),
      qualification: new FormControl({ value: '', disabled: true }),
      numOfChildren: new FormControl({ value: '', disabled: true }),
      occupation: new FormControl({ value: '', disabled: true }),
      fsb: new FormControl({ value: '', disabled: true }),
      jobType: new FormControl({ value: null, disabled: true }),
      approval: new FormControl({ value: '', disabled: true }),
      applicationNo: new FormControl({ value: '', disabled: true }),
      visa: new FormControl({ value: '', disabled: true }),
      startofWork: new FormControl({ value: '', disabled: true }),
      contractCadidate: new FormControl({ value: '', disabled: true }),
      dateOfContract: new FormControl({ value: '', disabled: true }),
      employerContact: new FormControl({ value: '', disabled: true }),
      certification: new FormControl({ value: '', disabled: true }),
      langLvl: new FormControl({ value: null, disabled: true }),
    });
    this.maritalStatus = this.commonS.getMaritalStatusList();
    this.countryList = this.flagS.getFlagsList();
    this.languagesLvl = this.commonS.getLanguagesLvl();
    this.jobTypes = this.commonS.getJobTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicant'].currentValue) {
      this.getVacancies();
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
          this.editDetail(this.applicant);
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

  getVacancieById(id: number) {
    if (!id) return 'N/A';
    for (const vacance of this.vacancies) {
      if (vacance.id === id) {
        return vacance.role ?? 'N/A';
      }
    }
  }

  editDetail(product: any) {
    this.isEdit = true;
    const vacance = this.vacancies.find(
      (item) => item.id === product.vacancy_id
    );

    const dob = new Date(product.date_of_birth);
    const additionalData = product.additional_data
      ? JSON.parse(product.additional_data)
      : {};
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
      ...additionalData,
    });
  }

  actionTriger(action: string) {
    // if (action === 'edit') {
    //   this.previousFormValue = this.overViewFormGoup.value;
    //   this.isEdit = !this.isEdit;
    // } else if (action === 'save') {
    //   this.onFormSubmit(this.overViewFormGoup.value);
    //   this.isEdit = !this.isEdit;
    // } else if (action === 'back' && this.isEdit) {
    //   this.overViewFormGoup.patchValue(this.previousFormValue);
    //   this.isEdit = !this.isEdit;
    // } else {
      this.router.navigate(['/']);
      // this.goBackTriger.emit();
    // }
  }
}
