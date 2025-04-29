import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Month view
import timeGridPlugin from '@fullcalendar/timegrid'; // Week & Day views
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AddNewMeetingComponent } from "./add-new-meeting/add-new-meeting.component";
import { SharedService } from '../Shared/services/shared.service';
import { AddViewDetailComponent } from "../arbeitgeber/add-view-detail/add-view-detail.component";
import { ViewNewMeetingComponent } from "./view-new-meeting/view-new-meeting.component";

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [FullCalendarModule, DrawerModule, CommonModule, DialogModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule, AddNewMeetingComponent, AddViewDetailComponent, ViewNewMeetingComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  showPopup:boolean=false;

  clickedEventObj:any={
    title: '',
    timeStart: null
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Default view
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Plugins for different views
    headerToolbar: {
      left: 'prev,next today', 
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: [], // Events to display on the calendar
    editable: false, // Allow dragging and resizing of events
    selectable: true, // Allow selection on the calendar
    dateClick: this.handleDateClick.bind(this), // Handle date clicks
    eventClick: this.handleEventClick.bind(this), // Handle event clicks
    eventClassNames: (arg) => {

      if (arg.event.extendedProps['meetingType'] === 'deadline') {
        return ['event-deadline'];
      } else if (arg.event.extendedProps['meetingType'] === 'meeting') {
        return ['event-meeting'];
      }
      return [];
    }
  };
formSubmit: boolean|undefined;

  handleDateClick(arg: any) {
    const today = new Date();
    const targetDate = new Date(arg.dateStr);

    // Remove time part for accurate day comparison
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    if(targetDate >= today){
      this.addNewMeetingDialog = {
        isOpen: true,
        title: 'Add New Meeting / Deadline',
        type: 'allow'
      }
      return;
    };

    this.addNewMeetingDialog = {
      isOpen: true,
      title: 'You can not add meeting on past date',
      type: 'noAllow'
    }

  }
  handleEventClick(arg: any) {

    const data = arg.event.extendedProps['data'];
    this.selectedData = data;
    this.clickedEventObj={
      title: arg.event.title, 
      timeStart: arg.event.start
    }
    this.viewDetail=true;
    this.visible=true;

  }

  // Calender Configurations Ends Here
  //==========================================================================================================


  visible: boolean = false;
  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  selectedData: any = null;
  viewDetail:boolean=false;
  addNewMeeting:boolean=false;
  addNewMeetingDialog:{isOpen: boolean, title: string , type:'allow'|'noAllow'} = {isOpen: false, title: '' , type: 'noAllow'};

  constructor(private SharedS: SharedService) {}

  ngOnInit(): void {
    this.getMeetungList();
  }


  getMeetungList(){
    this.SharedS.sendGetRequest('meetings').subscribe({
      next: (res: any) => {
        if(res.status === 200){
          const data = res?.body?.meetings ?? [];
          this.calendarOptions.events = data.map((reservation: any) => ({
            title: `${reservation?.meeting_type === 'deadline'?'⏰':'🗓'} ${reservation.title}`,
            start:new Date(reservation?.meeting_date ?? ''),
            extendedProps: {
              meetingType: reservation.meeting_type,
              data: reservation
            }
          }));
        }
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  onSubmit(): void {  
  
  }


  

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  onAccept(): void {
    this.resetDialog();
    this.visible = true;
    this.addNewMeeting = true;
  }


  resetDialog(): void {
    this.addNewMeetingDialog = {
      isOpen: false,
      title: '',
      type: 'noAllow'
    }
  }

  resetDrawer(): void {
    this.visible = false;
    this.selectedData = null;
    this.viewDetail = false;
    this.addNewMeeting = false;
  }
}
