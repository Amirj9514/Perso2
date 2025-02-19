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


  private maritalStatusList = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Married' },
    { id: 3, name: 'Divorced' },
    { id: 4, name: 'Widowed' },
    { id: 5, name: 'Separated' },
    { id: 6, name: 'Engaged' },
    // { id: 7, name: 'In a Relationship' }
  ];

  getRoles() {
    return this.roles;
  }

  getMaritalStatusList() {
    return this.maritalStatusList;
  }
}
