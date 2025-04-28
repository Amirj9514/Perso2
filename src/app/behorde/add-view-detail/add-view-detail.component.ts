import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'app-add-view-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FieldsetModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
  ],
  templateUrl: './add-view-detail.component.html',
  styleUrl: './add-view-detail.component.scss',
})
export class AddViewDetailComponent implements OnChanges {
  @Input() selectedRow: any;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() onSubmitEvent = new EventEmitter<void>();

  newApplicationFrom!: FormGroup;
  formSubmit: boolean = false;
  isEdit: boolean = false;
  loader: boolean = false;

  constructor(
    private toastS: CustomToastService,
    private sharedS: SharedService
  ) {
    this.newApplicationFrom = new FormGroup({
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      application: new FormControl(null, [Validators.required]),
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if( changes['selectedRow'] && changes['selectedRow'].currentValue) {
      this.isEdit = true;
      this.newApplicationFrom.patchValue({
        contact: this.selectedRow?.contact ?? '',
        email: this.selectedRow?.email ?? '',
        phone: this.selectedRow?.phone ?? '',
        address: this.selectedRow?.address ?? '',
        application: this.selectedRow?.application ?? '',
      });

    }else{
      this.isEdit = false;
    }
  }

  closeCallback(event: any) {
    if(this.loader) return;
    this.closeDrawer.emit();
  }

  onSubmit() {
    const formData = this.newApplicationFrom.value;
    const apiParam = {
      contact: formData?.contact ?? '',
      email: formData?.email ?? '',
      phone: formData?.phone ?? '',
      address: formData?.address ?? '',
      application: formData?.application ?? null,
    };
    
    const allFieldsEmpty = Object.values(apiParam).every(
      (value) => value === ''
    );
    if (!allFieldsEmpty) {
      this.loader = true;
      if(this.isEdit){
        this.sharedS.sendPutRequest(`authorities/${this.selectedRow?.id}`, apiParam).subscribe({
          next: (res) => {
            this.loader = false;
            this.toastS.setToast({
              show: true,
              message: 'Daten wurden erfolgreich aktualisiert',
            });
            this.onSubmitEvent.emit();
          },
          error: (err) => {
            this.loader = false;
            this.toastS.setToast({
              show: true,
              severity: 'error',
              message: 'Fehler beim Speichern der Daten',
            });
          },
        });
      }else{
      this.sharedS.sendPostRequest('authorities', apiParam).subscribe({
        next: (res) => {
          this.loader = false;
          this.toastS.setToast({
            show: true,
            message: 'Daten erfolgreich gespeichert',
          });
          this.onSubmitEvent.emit();
        },
        error: (err) => {
          this.loader = false;
          this.toastS.setToast({
            show: true,
            severity: 'error',
            message: 'Fehler beim Speichern der Daten',
          });
        },
      });
    }
      return;
    }

    this.toastS.setToast({
      show: true,
      severity: 'error',
      message: 'Alle Felder sind leer',
    });
  }
}
