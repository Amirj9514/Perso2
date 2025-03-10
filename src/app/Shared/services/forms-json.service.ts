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
            formControl: 'bewUbersetzung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Leg/Beg',
            formControl: 'bewLegbeg',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Sprachniveo',
            formControl: 'bewSprachniveo',
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
            formControl: 'bewSprachzertifikat',
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
            formControl: 'bewZab',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: 'Bescheid',
            formControl: 'bewBescheid',
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
            formControl: 'proArbeitsvertrag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Anererkennung',
            formControl: 'proAnererkennung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Bescheid',
            formControl: 'proBescheid',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '§81a ',
            formControl: 'proS81a',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Vereinbarung',
            formControl: 'proVereinbarung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'VAZ',
            formControl: 'proVaz',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Konsulat',
            formControl: 'proKonsulat',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Unterkunft',
            formControl: 'proUnterkunft',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Visum',
            formControl: 'proVisum',
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
            formControl: 'onbVazag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Versicherung',
            formControl: 'onbVersicherung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Visa AG',
            formControl: 'onbVisaag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '3 Terminvorschläge',
            formControl: 'onbThreeTerminvorschlage',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Transfer',
            formControl: 'onbTransfer',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '1 Arbeitstag',
            formControl: 'onbOneArbeitstag',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Wohnanmeldung',
            formControl: 'onbWohnanmeldung',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Bank',
            formControl: 'onbBank',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Ausländerbehörde',
            formControl: 'onbOuslanderbehorde',
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
