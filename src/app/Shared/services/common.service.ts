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

  private languagesLvl = [
    // {
    //   id: 1,
    //   name: 'A1',
    //   description: 'Beginner'
    // },
    // {
    //   id: 2,
    //   name: 'A2',
    //   description: 'Elementary'
    // },
    {
      id: 3,
      name: 'B1',
      description: 'Intermediate'
    },
    {
      id: 4,
      name: 'B2',
      description: 'Upper Intermediate'
    },
    {
      id: 5,
      name: 'C1',
      description: 'Advanced'
    },
    {
      id: 6,
      name: 'C2',
      description: 'Proficient'
    }
  ]


  private jobTypes = [
    { id: 1, name: 'Full Time' },
    { id: 2, name: 'Part Time' },
  ];

  private colors =[
    { id: 1, name: 'NEIN' , color: 'red'},
    { id: 2, name: 'JA' , color: 'green'},
    { id: 3, name: 'IN BEARBEITUNG' , color: 'orange'},
  ]

  

  getRoles() {
    return this.roles;
  }

  getMaritalStatusList() {
    return this.maritalStatusList;
  }

  getLanguagesLvl() {
    return this.languagesLvl;
  }

  getJobTypes() {
    return this.jobTypes;
  }

  getColors() {
    return this.colors;
  }
}
