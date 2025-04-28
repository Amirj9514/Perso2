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

  @Input() selectedRow: any = null;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() onSubmitEvent = new EventEmitter<void>();

  newApplicationFrom!: FormGroup;
  formSubmit: boolean = false;
  isEdit: boolean = false;

  constructor(private toastS: CustomToastService , private sharedS: SharedService) {
    this.newApplicationFrom = new FormGroup({
      branch: new FormControl('', [Validators.required]),
      cooperation_partner: new FormControl('', [Validators.required]),
      employer: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      contact: new FormControl(null, [Validators.required]),
    });
  }


    ngOnChanges(changes: SimpleChanges): void {
      if( changes['selectedRow'] && changes['selectedRow'].currentValue) {
        this.isEdit = true;
        this.newApplicationFrom.patchValue({
          branch: this.selectedRow?.branch ?? '',
          cooperation_partner: this.selectedRow?.cooperation_partner ?? '',
          employer: this.selectedRow?.employer ?? '',
          place: this.selectedRow?.place ?? '',
          contact: this.selectedRow?.contact ?? '',
        });
  
      }else{
        this.isEdit = false;
      }
    }


  closeCallback(event: any) {
    this.closeDrawer.emit();
  }

  onSubmit() {
    const formData = this.newApplicationFrom.value;
    const apiParam = {
      branch:formData?.branch ?? '',
      cooperation_partner:formData?.cooperation_partner ?? '',
      employer:formData?.employer ?? '',
      place:formData?.place ?? '',
      contact:formData?.contact ?? '',
    }    
    const allFieldsEmpty = Object.values(apiParam).every(value => value === '');
    if(!allFieldsEmpty){

      if(this.isEdit) {
        this.sharedS.sendPutRequest(`cooperation_employer/${this.selectedRow?.id}` , apiParam).subscribe({
          next: (res) => {
            this.toastS.setToast({
              show: true,
              message: 'Daten wurden erfolgreich aktualisiert',
            });
            this.onSubmitEvent.emit();
          },
          error: (err) => {
            this.toastS.setToast({
              show: true,
              severity:'error',
              message: 'Fehler beim Speichern der Daten',
            });
          },
        });

        return;
      }else{
      this.sharedS.sendPostRequest('cooperation_employer' , apiParam).subscribe({
        next: (res) => {
          this.toastS.setToast({
            show: true,
            message: 'Daten erfolgreich gespeichert',
          });
          this.onSubmitEvent.emit();
        },
        error: (err) => {
          this.toastS.setToast({
            show: true,
            severity:'error',
            message: 'Fehler beim Speichern der Daten',
          });
        },
      })
      return;
    }
    
    this.toastS.setToast({
      show: true,
      severity:'error',
      message: 'Alle Felder sind leer',
    });
  }

  }
}
