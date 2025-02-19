import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 interface ShowToast {
  show: boolean;
  message: string;
  severity?: string;
  duration?: number;
  position?: string;
  styleClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {
  private toastData = new Subject<ShowToast | null>();
  constructor() {}

  setToast(data: ShowToast): void {
    this.toastData.next(data);
  }

  showToast() {
    return this.toastData.asObservable();
  }
}
