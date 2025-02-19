import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FlagsService } from './Shared/services/flags.service';
import { MessageService } from 'primeng/api';
import { CustomToastService } from './Shared/services/custom-toast.service';

import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,ToastModule , MessageModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'perso2';

  constructor(private flagS:FlagsService , private messageService: MessageService , private customToast:CustomToastService){
  }

  ngOnInit(){

    this.customToast.showToast().subscribe((res:any)=>{
      switch(res.severity){
        case 'error':
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
          break;
        case 'info':
          this.messageService.add({severity:'info', summary: 'Info', detail: res.message});
          break;
        case 'warn':
          this.messageService.add({severity:'warn', summary: 'Warn', detail: res.message});
          break;
        default:
          this.messageService.add({severity:'success', summary: 'Success', detail: res.message});
          break;
      }
    });
  }


}
