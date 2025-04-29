import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SharedService } from '../../Shared/services/shared.service';
import { CustomToastService } from '../../Shared/services/custom-toast.service';

@Component({
  selector: 'app-add-new-meeting',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
  ],
  templateUrl: './add-new-meeting.component.html',
  styleUrl: './add-new-meeting.component.scss',
  providers: [DatePipe],
})
export class AddNewMeetingComponent implements OnChanges {

  @Input() selectedRow: any;
  @Output() closeDrawer = new EventEmitter<any>();
  @Output() onFormsubmit = new EventEmitter<any>();

  newApplicationFrom!: FormGroup;
  formSubmit: boolean = false;
  showType: boolean = false;
  todayDate: Date = new Date();
  loader: boolean = false;
  meetingTypes: any[] = [
    { label: 'Meeting', value: 'meeting' },
    { label: 'Deadline', value: 'deadline' },
  ]

  isEditMode: boolean = false; 
  constructor(private datePipe: DatePipe , private SharedS:SharedService , private toastS: CustomToastService) {
    this.newApplicationFrom = new FormGroup({
      title: new FormControl('', [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRow'] && this.selectedRow) {
     this.isEditMode = true; // Set edit mode to true when selectedRow is available 
      this.setValueToForm();
    }else{
      this.isEditMode = false; // Set edit mode to false when selectedRow is not available 
    }
  }


  closeCallback(event: any) {
    if(this.loader) return; // Prevent closing if loader is active
    this.closeDrawer.emit(event); // Emit the event to the parent component
  }

  onSubmit() {
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched(); // Ensure all validation errors appear
      return;
    }

    const combineDateTime = this.combineAndFormat(this.newApplicationFrom.value?.date, this.newApplicationFrom.value?.time);
    if (!combineDateTime) {
      this.toastS.setToast({
        severity: 'error',
        show: true,
        message: 'Datensatz erfolgreich hinzugefügt',
      });
      return; 
    }
    const apiParam = {
      title: this.newApplicationFrom.value?.title,
      meeting_type: this.newApplicationFrom.value?.type?.value ?? '',
      meeting_date: combineDateTime?? '',
      description: this.newApplicationFrom?.value?.description ?? '',
    }
    this.loader = true; // Show loader when API call is in progress
    if(this.isEditMode){
      this.SharedS.sendPutRequest(`/meetings/${this.selectedRow?.id}` , apiParam).subscribe({
        next:(res:any)=>{
          this.loader = false; // Hide loader when API call is complete
          if(res?.status === 200){
            this.toastS.setToast({
              severity: 'success',
              show: true,
              message: 'Datensatz erfolgreich hinzugefügt',
            });
            this.onFormsubmit.emit(res);
          }
        },error:(err:any)=>{
          this.loader = false; // Hide loader when API call is complete
          this.toastS.setToast({
            severity: 'error',
            show: true,
            message: 'Datensatz erfolgreich hinzugefügt',
          });
        }
      })

    }else{
    this.SharedS.sendPostRequest('meetings' , apiParam).subscribe({
      next:(res:any)=>{
        this.loader = false; // Hide loader when API call is complete
        if(res?.status === 200){
          this.toastS.setToast({
            severity: 'success',
            show: true,
            message: 'Datensatz erfolgreich hinzugefügt',
          });
          this.onFormsubmit.emit(res);
        }
      },error:(err:any)=>{
        this.loader = false; // Hide loader when API call is complete
        this.toastS.setToast({
          severity: 'error',
          show: true,
          message: 'Datensatz erfolgreich hinzugefügt',
        });
      }
    })
  }
    
  }


  setValueToForm(){
    const { date, time } = this.seprateDateTime(this.selectedRow?.meeting_date);
    this.newApplicationFrom.patchValue({
      title: this.selectedRow?.title,
      type: this.getTypeValue(this.selectedRow?.meeting_type),
      date: new Date(date),
      time: time,
      description: this.selectedRow?.description,
    });

    console.log(this.newApplicationFrom);
    
  }

  combineAndFormat(date : string, time: string) {
    if(!date || !time) {
      return null; 
    }
    const parsedDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    parsedDate.setHours(hours);
    parsedDate.setMinutes(minutes);
    const formatted = this.datePipe.transform(parsedDate, 'yyyy-MM-dd HH:mm');
    return formatted;
  }

  seprateDateTime(dateTime: any) {
    const date = new Date(dateTime);
    const formattedTime = this.datePipe.transform(date, 'HH:mm');
    return { date: date, time: formattedTime };
  }

  getTypeValue(value: any) {
    if(!value) {
      return null;
    }

    for (const element of this.meetingTypes) {
      if (element.value === value) {
        return element;
      }
    }
  }
}
