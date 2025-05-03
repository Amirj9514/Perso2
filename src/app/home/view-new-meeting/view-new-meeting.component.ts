import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-view-new-meeting',
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
  templateUrl: './view-new-meeting.component.html',
  styleUrl: './view-new-meeting.component.scss',
  providers: [DatePipe],
})
export class ViewNewMeetingComponent {
  @Input() selectedRow: any;
 @Output() closeDrawer = new EventEmitter<any>();
  @Output() onFormsubmit = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();

  newApplicationFrom!: FormGroup;
  formSubmit: boolean = false;
  showType: boolean = false;
  meetingTypes: any[] = [
    { label: 'Meeting', value: 'meeting' },
    { label: 'Deadline', value: 'deadline' },
  ]

  loader: boolean = false;
  constructor(private datePipe: DatePipe , private SharedS:SharedService , private toastS: CustomToastService) {
    this.newApplicationFrom = new FormGroup({
      title: new FormControl('', [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }


  closeCallback(event: any) {
    if(this.loader) return; 
    this.closeDrawer.emit(event); // Emit the event to the parent component
  }

  onSubmit() {
    this.onEdit.emit();  
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


  deleteMeeting(){
    this.loader = true;
    this.SharedS.sendDeleteRequest(`meetings/${this.selectedRow?.id}`).subscribe({
      next:(res:any)=>{
        this.loader = false;
        if(res?.status === 200){
          this.toastS.setToast({
            severity: 'success',
            show: true,
            message: 'Datensatz erfolgreich gelöscht',
          });
          this.onFormsubmit.emit(res);
        }
      },error:(err:any)=>{
        this.loader = false;
        this.toastS.setToast({
          severity: 'error',
          show: true,
          message: 'Datensatz erfolgreich gelöscht',
        });
      }
    })
  }
}

