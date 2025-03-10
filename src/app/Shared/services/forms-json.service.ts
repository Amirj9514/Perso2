import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class FormsJsonService {
  statusList: any[] = [];

  tab1FormJson: any[] = [];
  constructor(private commonS: CommonService) {
    this.statusList = this.commonS.getColors();
    this.tab1FormJson = this.createFormJson();
  }

  createFormJson() {
    return [
      {
        title: 'Bewerber',
        form: [
          {
            lable: 'Übersetzung',
            formControl: 'ubersetzung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Leg/Beg',
            formControl: 'legbeg',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Sprachniveo',
            formControl: 'sprachniveo',
            type: 'select',
            value: null,
            options: [
              { id: 1, name: 'A1', description: 'Beginner' },
              { id: 3, name: 'B1', description: 'Intermediate' },
              { id: 4, name: 'B2', description: 'Upper Intermediate' },
            ],
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Sprachzertifikat',
            formControl: 'sprachzertifikat',
            type: 'select',
            value: null,
            options: [
              { id: 1, name: 'JA B1', description: '' },
              { id: 2, name: 'JA B2', description: '' },
              { id: 3, name: 'TEIL B1', description: '' },
              { id: 4, name: 'TEIL B2', description: '' },
              { id: 5, name: 'NEIN', description: '' },
            ],
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: 'ZAB',
            formControl: 'zab',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: 'Bescheid',
            formControl: 'bescheid',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
        ],
      },
      {
        title:'Prozessübersicht',
        form:[
          {
            lable: 'Arbeitsvertrag',
            formControl: 'arbeitsvertrag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Anererkennung',
            formControl: 'anererkennung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Bescheid',
            formControl: 'bescheid',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '§81a ',
            formControl: 's81a',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Vereinbarung',
            formControl: 'vereinbarung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'VAZ',
            formControl: 'vaz',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Konsulat',
            formControl: 'konsulat',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Unterkunft',
            formControl: 'unterkunft',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Visum',
            formControl: 'visum',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },  
        ]
      },
      {
        title:'Onboarding',
        form:[
          {
            lable: 'VAZ /AG',
            formControl: 'vazag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Versicherung',
            formControl: 'versicherung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Visa AG',
            formControl: 'visaag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '3 Terminvorschläge',
            formControl: 'threeTerminvorschlage',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Transfer',
            formControl: 'transfer',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '1 Arbeitstag',
            formControl: 'oneArbeitstag',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Wohnanmeldung',
            formControl: 'wohnanmeldung',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Bank',
            formControl: 'bank',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Ausländerbehörde',
            formControl: 'auslanderbehorde',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
        ]
      }
    ];
  }

  getTab1FormJson() {
    return this.tab1FormJson;
  }
}
