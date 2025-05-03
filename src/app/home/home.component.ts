import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Shared/services/shared.service';
import { CustomToastService } from '../Shared/services/custom-toast.service';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ViewNewMeetingComponent } from './view-new-meeting/view-new-meeting.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DrawerModule, ViewNewMeetingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  filteredMeetings: any[] = [];
  visible: boolean = false;
  selectedRow: any = null;  
  constructor(private sharedS:SharedService , private toastS:CustomToastService) { }

  ngOnInit(): void {
    this.getmeetingData();
  }

  getmeetingData(){
    this.sharedS.sendGetRequest('meetings').subscribe({
      next: (res) => {
        if(res.status === 200){
          const data = res?.body?.meetings ?? [];
          this.filterData(data);
        }
      },
      error: (err) => {
        this.toastS.setToast({
          show: true,
          severity: 'error',
          message: 'Error fetching data',
        })
      }
    })
  }

  filterData(meetings: any[]) {
 // Get today's date at 00:00 local time
 const today = new Date();
 today.setHours(0, 0, 0, 0);

 const todayData: { [key: string]: any[] } = {};
 const upcomingData: { [key: string]: any[] } = {};

 meetings.forEach(meeting => {
   const meetingDate = new Date(meeting.meeting_date);
   meetingDate.setHours(0, 0, 0, 0); // normalize to local midnight

   const type = meeting.meeting_type;

   if (meetingDate.getTime() === today.getTime()) {
     if (!todayData[type]) todayData[type] = [];
     todayData[type].push(meeting);
   } else if (meetingDate.getTime() > today.getTime()) {
     if (!upcomingData[type]) upcomingData[type] = [];
     upcomingData[type].push(meeting);
   }
 });

 this.filteredMeetings = [
   { title: 'Today', data: todayData },
   { title: 'Upcoming', data: upcomingData }
 ];
}
  

  shortDescription(data: string): string {
    if (!data) return '';
    return data.length > 170 ? data.substring(0, 170) + '...' : data;

  }
}
