import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { 
    // let data =    
  }

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


  private enrollmentCategories = [
    {
      id:1,
      name: 'Gesundheitswesen',
      subCatCode:'healthcare',
      subCategories: [
        {
          id:'healthcare_1',
          name: 'Pflege',
        },
        {
          id: 'healthcare_2',
          name: 'OTA'
        },
        {
          id: 'healthcare_3',
          name: 'ATA'
        },
        {
          id: 'healthcare_4',
          name: 'MTRA'
        },
        {
          id: 'healthcare_5',
          name: 'MTLA'
        },
        {
          id: 'healthcare_6',
          name: 'MPhiysiotherapeutenFA'
        },
        {
          id: 'healthcare_7',
          name: 'ZFA / MFA',
        },
        {
          id: 'healthcare_8',
          name: 'Hebammen'
        },
        {
          id: 'healthcare_9',
          name: 'Sportwissenschaften',
        },
       
      ]
    },
    {
      id:2,
      name: 'Facharbeiter',
      subCatCode:'worker',
      subCategories: [
        {
          id:'worker_1',
          name: 'Elektriker / Elekromechaniker',
        },
        {
          id: 'worker_2',
          name: 'Mechaniker/ Mechatroniker Arbeit'
        },
        {
          id: 'worker_3',
          name: 'Bauarbeiter'
        },
        {
          id: 'worker_4',
          name: 'Fahrer / Spedition'
        },
        {
          id: 'worker_5',
          name: 'Kälte / Wärme'
        },
        {
          id: 'worker_6',
          name: 'Logistiker'
        },
        {
          id: 'worker_7',
          name: 'Koch / Gastonomie'
        },
        {
          id: 'worker_8',
          name: 'Hotel'
        },
      ]
    },
    {
      id:3,
      name:'Fachkraft',
      subCatCode:'professional',
      subCategories: [
        {
          id:'professional_1',
          name: 'Erlektroigeneur'
        },
        {
          id: 'professional_2',
          name: 'Maschienenbauigeneuere'
        },
        {
          id: 'professional_3',
          name: 'IT'
        },
        {
          id: 'professional_4',
          name: 'Bauingeneur'
        },
        {
          id: 'professional_5',
          name: 'Industrie'
        },
        {
          id: 'professional_6',
          name: 'Erziehungswissenschaft'
        },
      ]
    },
    {
      id:4,
      name:'Auszubildenen',
      subCatCode:'trainee',
      subCategories: [
        {
          id:'trainee_1',
          name: 'Pflegefachkraft'
        },
        {
          id: 'trainee_2',
          name: 'Pflegehelfer'
        },
        {
          id:'trainee_3',
          name: 'ZFA'
        },
        {
          id: 'trainee_4',
          name: 'MFA'
        },
        {
          id:'trainee_5',
          name: 'Physiotherapie'
        },
        {
          id: 'trainee_6',
          name: 'Ehrzieher'
        },
        {
          id:'trainee_7',
          name: 'Fahrer'
        },
        {
          id: 'trainee_8',
          name: 'Gastronomie'
        },
        {
          id: 'trainee_9',
          name: 'Hotel'
        },
      ]
    }
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

  getEnrollmentCategories() {
    return this.enrollmentCategories;
  }
}
