import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'agent' },
    { label: 'Agent', value: 'viewer' },
    
  ]


  private maritalStatusList = [
    { id: 1, name: 'ledig' },
    { id: 2, name: 'verheiratet' },
    { id: 3, name: 'Geschieden' },
    // { id: 7, name: 'In a Relationship' }
  ];

  getRoles() {
    return this.roles;
  }

  getMaritalStatusList() {
    return this.maritalStatusList;
  }
}
