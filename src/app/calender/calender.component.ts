import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Month view
import timeGridPlugin from '@fullcalendar/timegrid'; // Week & Day views
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [FullCalendarModule, DrawerModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Default view
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Plugins for different views
    headerToolbar: {
      left: 'prev,next today', // Buttons on the left: Previous, Next, Today
      center: 'title', // Title (e.g., "November 2024") in the center
      right: 'dayGridMonth,timeGridWeek,timeGridDay', // Buttons for Month, Week, and Day views on the right
    },
    events: [], // Events to display on the calendar
    editable: true, // Allow dragging and resizing of events
    selectable: true, // Allow selection on the calendar
    dateClick: this.handleDateClick.bind(this), // Handle date clicks
    eventClick: this.handleEventClick.bind(this), // Handle event clicks
  };

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }
  handleEventClick(arg: any) {
    alert(`Event clicked: ${arg.event.title}\nStart: ${arg.event.start}`);
  }

  // Calender Configurations Ends Here
  //==========================================================================================================


  visible: boolean = false;
  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  reservationList:any[] = [
    {
      request_data: { first_name: 'John', last_name: 'Doe' },
      reservation_time: new Date('2025-02-20T10:00:00'),
    },
    {
      request_data: { first_name: 'Alice', last_name: 'Smith' },
      reservation_time: new Date('2025-02-21T14:30:00'),
    },
    {
      request_data: { first_name: 'Bob', last_name: 'Johnson' },
      reservation_time: new Date('2025-02-22T09:15:00'),
    },
    {
      request_data: { first_name: 'Charlie', last_name: 'Brown' },
      reservation_time: new Date('2025-02-23T12:45:00'),
    },
    {
      request_data: { first_name: 'David', last_name: 'Williams' },
      reservation_time: new Date('2025-02-24T08:00:00'),
    },
    {
      request_data: { first_name: 'Emily', last_name: 'Davis' },
      reservation_time: new Date('2025-02-25T16:30:00'),
    },
    {
      request_data: { first_name: 'Frank', last_name: 'Miller' },
      reservation_time: new Date('2025-02-26T14:00:00'),
    },
    {
      request_data: { first_name: 'Grace', last_name: 'Wilson' },
      reservation_time: new Date('2025-02-27T09:45:00'),
    },
    {
      request_data: { first_name: 'Henry', last_name: 'Moore' },
      reservation_time: new Date('2025-02-28T11:15:00'),
    },
    {
      request_data: { first_name: 'Isabella', last_name: 'Taylor' },
      reservation_time: new Date('2025-03-01T15:30:00'),
    }
  ];

  constructor() {
    this.newApplicationFrom = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      date: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.calendarOptions.events = this.reservationList.map((reservation) => ({
      title: `${reservation.request_data.first_name} ${reservation.request_data.last_name}`,
      start: reservation.reservation_time,
    }));
  }

  
  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
