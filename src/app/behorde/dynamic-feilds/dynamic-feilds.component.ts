import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CustomToastService } from '../../Shared/services/custom-toast.service';
import { SharedService } from '../../Shared/services/shared.service';
import { FileInputComponent } from '../../Shared/components/file-input/file-input.component';
import { ApplicantService } from '../../Shared/services/applicant.service';
import { forkJoin, of } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-dynamic-feilds',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FieldsetModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    FileInputComponent,
    Dialog, ProgressSpinnerModule
  ],
  templateUrl: './dynamic-feilds.component.html',
  styleUrl: './dynamic-feilds.component.scss',
})
export class DynamicFeildsComponent {
  @Input() selectedRow: any;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() onSubmitEvent = new EventEmitter<void>();
  @Output() onFileRemove = new EventEmitter<void>();

  newApplicationFrom!: FormGroup;
  FormulareForm!: FormGroup;
  applicantDocList: any[] = [];
  formSubmit: boolean = false;

  removeLoader: boolean = false;

  constructor(
    private toastS: CustomToastService,
    private sharedS: SharedService,
    private applicantS: ApplicantService
  ) {
    this.newApplicationFrom = new FormGroup({});
    this.FormulareForm = new FormGroup({});
  }

  ngOnInit() {
    this.getDocumentList();
  }

  getDocumentList() {
    this.sharedS
      .sendGetRequest(
        `authority-documents?authority_id=${this.selectedRow?.id}`
      )
      .subscribe({
        next: (res) => {
          if (res.status === 200) {

            const data = res.body?.authority_documents ?? [];
            this.applicantDocList = data;
            this.applicantS.updateAuthorityDocumentList(data);
            const checkJson = this.selectedRow.checklist;
            const formJson = this.selectedRow.formulate;
            const checkList = JSON.parse(checkJson ?? '{}');
            const formList = JSON.parse(formJson ?? '{}');
            this.createFormFieldsFromObject(checkList);
            this.createFormFieldsFromObject2(formList);

            this.FormulareForm.patchValue(formList);
          }
        },
        error: (err) => {},
      });
  }

  closeCallback(event: any) {
    this.closeDrawer.emit();
  }

  onSubmit() {
    if (this.newApplicationFrom.valid && this.FormulareForm.valid) {
      const apiParam = {
        checklist: JSON.stringify(this.newApplicationFrom.value) ?? '{}',
        formulate: JSON.stringify(this.FormulareForm.value) ?? '{}',
      };
      this.sharedS
        .sendPutRequest(`authorities/${this.selectedRow?.id}`, apiParam)
        .subscribe({
          next: (res: any) => {
            this.formSubmit = false;
            if (res.status === 200) {
              this.toastS.setToast({
                show: true,
                severity: 'success',
                message: 'Erfolgreich aktualisiert',
              });
              this.onSubmitEvent.emit();
            }
          },
          error: (err) => {
            this.formSubmit = false;
            this.toastS.setToast({
              show: true,
              severity: 'error',
              message: err?.error?.message ?? 'Something went wrong',
            });
          },
        });
      return;
    }
    this.newApplicationFrom.markAllAsTouched();
    this.FormulareForm.markAllAsTouched();
  }

  addNewFormFeilds() {
    const formData: any = this.newApplicationFrom.value;
    let highestIndex = 0;
    if (Object.keys(formData).length) {
      highestIndex = this.highestFormIndex(formData);
    }

    if (highestIndex > 5) {
      this.toastS.setToast({
        show: true,
        severity: 'error',
        message: 'Maximal 6 Felder erlaubt',
      });
      return;
    }
    const newFieldName = `checklist_${highestIndex + 1}`;
    this.newApplicationFrom.addControl(
      newFieldName,
      new FormControl('', [Validators.required])
    );
  }

  addNewFormFeilds2() {
    const formData: any = this.FormulareForm.value;
    let highestIndex = 0;
    if (Object.keys(formData).length) {
      highestIndex = this.highestFormIndex(formData);
    }

    if (highestIndex > 10) {
      this.toastS.setToast({
        show: true,
        severity: 'error',
        message: 'Maximal 11 Felder erlaubt',
      });
      return;
    }
    const newFieldName = `formulare_${highestIndex + 1}`;
    this.FormulareForm.addControl(
      newFieldName,
      new FormControl('', [Validators.required])
    );
  }

  deleteFormFeilds(formFeildName: string | undefined) {
    if (!formFeildName) return;
    this.newApplicationFrom.removeControl(formFeildName);
    this.deleteFile(formFeildName);

  }

  deleteFormFeilds2(formFeildName: string | undefined) {
    if (!formFeildName) return;
    this.FormulareForm.removeControl(formFeildName);
    this.deleteFile(formFeildName);
    
  }


  deleteFile(key: string) {
    // Start loader
    this.removeLoader = true;
  
    // Find the document to delete
    const matchedDocs = this.applicantDocList.filter((item) => item.metadata === key);
    const id = matchedDocs[0]?.id;
  
    // Create update API call
    const apiParam = {
      checklist: JSON.stringify(this.newApplicationFrom.value) ?? '{}',
      formulate: JSON.stringify(this.FormulareForm.value) ?? '{}',
    };
    const updateRequest$ = this.sharedS.sendPutRequest(`authorities/${this.selectedRow?.id}`, apiParam);
  
    let deleteRequest$;
    if (id) {
      deleteRequest$ = this.sharedS.sendDeleteRequest(`authority-documents/${id}`);
    } else {
      // If no ID, return dummy observable so forkJoin works
      deleteRequest$ = of({ status: 204 }); 
    }
  
    forkJoin([deleteRequest$, updateRequest$]).subscribe({
      next: ([deleteRes, updateRes]) => {
        // Handle delete response
        if (id && deleteRes.status === 200) {
          this.toastS.setToast({
            show: true,
            severity: 'success',
            message: 'Datei erfolgreich gelöscht',
          });
        }
  
        // Handle update response
        if (updateRes.status === 200) {
          this.toastS.setToast({
            show: true,
            severity: 'success',
            message: 'Erfolgreich aktualisiert',
          });
          this.onFileRemove.emit();
        }
  
        // Stop loader
        this.removeLoader = false;
      },
      error: (err) => {
        this.removeLoader = false;
        this.toastS.setToast({
          show: true,
          severity: 'error',
          message: err?.error?.message ?? 'Something went wrong',
        });
      }
    });
  }
  highestFormIndex(formData: any) {
    return Math.max(
      ...Object.keys(formData).map((key) => {
        const match = key.match(/\d+$/); // extract number at the end
        return match ? parseInt(match[0], 10) : 0;
      })
    );
  }

  createFormFieldsFromObject(data: { [key: string]: string }) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      this.newApplicationFrom.addControl(key, new FormControl(value));
    });
  }

  createFormFieldsFromObject2(data: { [key: string]: string }) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      this.FormulareForm.addControl(key, new FormControl(value));
    });
  }
}
