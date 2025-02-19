import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Agent', value: 'agent' }
  ]

  getRoles() {
    return this.roles;
  }
}
