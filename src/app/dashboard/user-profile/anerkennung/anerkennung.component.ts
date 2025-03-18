import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { CommonService } from '../../../Shared/services/common.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsJsonService } from '../../../Shared/services/forms-json.service';
import { Router } from '@angular/router';
import { UpdateApplicantDialogComponent } from '../../../Shared/components/update-applicant-dialog/update-applicant-dialog.component';
import { DateInputComponent } from '../../../Shared/components/date-input/date-input.component';
import { FileInputComponent } from '../../../Shared/components/file-input/file-input.component';

@Component({
  selector: 'app-anerkennung',
  standalone: true,
  imports: [
    ButtonModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    UpdateApplicantDialogComponent,
    DateInputComponent,
    FileInputComponent
  ],
  templateUrl: './anerkennung.component.html',
  styleUrl: './anerkennung.component.scss',
})
export class AnerkennungComponent implements OnChanges {
  @Input() applicant: any;
  @Input() categoory: string = 'healthcare';
  @Output() goBackTriger = new EventEmitter();

  tab1FormJson: any[] = [];
  statusList: any[] = [];
  Sprachniveo: any[] = [
    { id: 1, name: 'A1', description: 'Beginner' },
    { id: 3, name: 'B1', description: 'Intermediate' },
    { id: 4, name: 'B2', description: 'Upper Intermediate' },
  ];
  Sprachzertifikat: any[] = [
    { id: 1, name: 'JA B1', description: '' },
    { id: 2, name: 'JA B2', description: '' },
    { id: 3, name: 'TEIL B1', description: '' },
    { id: 4, name: 'TEIL B2', description: '' },
    { id: 5, name: 'NEIN', description: '' },
  ];

  overViewFormGoup!: FormGroup;
  previousFormValue: any;
  tab1SaveValue: any;
  isEdit: boolean = false;

  showUpdateDialog: { show: boolean; applicantData: any; data: any } | null =
    null;

  constructor(
    private commonS: CommonService,
    private formsJsonS: FormsJsonService,
    private router: Router
  ) {
    this.statusList = this.commonS.getColors();
    const formJson = this.formsJsonS.getTab6FormJson();
    this.createForm(formJson);
    this.tab1FormJson = this.formsJsonS.getTab6FormJson();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicant'].currentValue) {
      this.tab1SaveValue = this.applicant.tab_6;
      this.updateFromValue();
    } 
  }

  createForm(formJson: any) {
    this.overViewFormGoup = new FormGroup({});
    formJson.forEach((form: any) => {
      form.form.forEach((element: any) => {
        this.overViewFormGoup.addControl(
          element.formControl,
          new FormControl(element.value)
        );
      });
    });
  }

  returnFeildValue(feild: any) {
    if (feild.type === 'select') {
      return this.overViewFormGoup.get(feild?.formControl)?.value?.name;
    } else {
      return this.overViewFormGoup.get(feild?.formControl)?.value;
    }
  }

  returnFeildBg(feild: any) {
    if (feild.type === 'select') {
      return this.overViewFormGoup.get(feild?.formControl)?.value?.color;
    } else {
      return '';
    }
  }

  onFormSubmit(formValue: any) {
    const apiParams = {
      id: this.applicant.id,
      tab_6:JSON.stringify(formValue),
    }
    this.showUpdateDialog = {
      show: true,
      applicantData: this.applicant,
      data: apiParams,
    };
  }

  updateFromValue() {
    if (this.tab1SaveValue) {
      this.overViewFormGoup.patchValue(JSON.parse(this.tab1SaveValue));
    }
  }

  actionTriger(action: string) {
    if (action === 'edit') {
      this.previousFormValue = this.overViewFormGoup.value;
      this.isEdit = !this.isEdit;
    } else if (action === 'save') {
      if (this.overViewFormGoup.invalid) return;
      this.onFormSubmit(this.overViewFormGoup.value);
      this.isEdit = !this.isEdit;
    } else if (action === 'back' && this.isEdit) {
      this.overViewFormGoup.patchValue(this.previousFormValue);
      this.isEdit = !this.isEdit;
    } else {
      this.router.navigate(['/']);
      // this.goBackTriger.emit();
    }
  }

  includeTheRole(row:any){
    const data = this.categoory;
    if(!row?.activeIn) return true;
    if(row?.activeIn.includes(data)) return true;
    return false;
  }
}
