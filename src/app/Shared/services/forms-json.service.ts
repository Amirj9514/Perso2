import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class FormsJsonService {
  private statusList: any[] = [];

  private tab1FormJson: any[] = [];
  private tab3FormJson: any[] = [];
  private tab4FormJson: any[] = [];
  private tab5FormJson: any[] = [];
  private tab6FormJson: any[] = [];
  private tab7FormJson: any[] = [];
  private tab8FormJson: any[] = [];
  private tab9FormJson: any[] = [];
  private tab10FormJson: any[] = [];
  private tab11FormJson: any[] = [];
  private tab12FormJson: any[] = [];
  constructor(private commonS: CommonService) {
    this.statusList = this.commonS.getColors();
    this.tab1FormJson = this.createFormJson();
    this.tab3FormJson = this.createTab3FormJson();
    this.tab4FormJson = this.createTab4FormJson();
    this.tab5FormJson = this.createTab5FormJson();
    this.tab6FormJson = this.createTab6FormJson();
    this.tab7FormJson = this.createTab7FormJson();
    this.tab8FormJson = this.createTab8FormJson();
    this.tab9FormJson = this.createTab9FormJson();
    this.tab10FormJson = this.createTab10FormJson();
    this.tab11FormJson = this.createTab11FormJson();
    this.tab12FormJson = this.createTab12FormJson();
  }

  // ==============================================================================
  //       Tab1 Form Json
  // ==============================================================================
  private createFormJson() {
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
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'B1 Prüfung',
            formControl: 'bewB1prufung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'B2 Prüfung',
            formControl: 'bewB2prufung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare','worker' , 'professional'],
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
            activeIn:['healthcare'],
          },
          {
            lable: 'IHK/HWK',
            formControl: 'bewIhkhwk',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['worker'],
          },
          {
            lable: 'Anerkennung',
            formControl: 'bewAnerkennung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['trainee'],
          },
        ],
      },
      {
        title: 'Prozessübersicht',
        form: [
          {
            lable: 'Arbeitsvertrag',
            formControl: 'proArbeitsvertrag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Antrag Anerkennung',
            formControl: 'proAnererkennung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare'],
          },
          {
            lable: 'Anerkennung',
            formControl: 'proAnerkennung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['trainee'],
          },
          {
            lable: 'ZAB',
            formControl: 'proZAB',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['worker','professional'],
          },
          {
            lable: 'IHK/HWK',
            formControl: 'proIHKHWK',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['worker' , 'professional'],
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
            activeIn:['healthcare' , 'worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Antrag §81a ',
            formControl: 'proS81a',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' ,'professional' , 'trainee'],
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
            activeIn:['healthcare' , 'worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare' , 'worker', 'professional' , 'trainee'],
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
            activeIn:['healthcare' , 'worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare' , 'worker', 'professional' , 'trainee'],
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
            activeIn:['healthcare' , 'worker', 'professional' , 'trainee'],
          },
        ],
      },
      {
        title: 'Onboarding',
        form: [
          {
            lable: 'VAZ /AG',
            formControl: 'onbVazag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
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
            activeIn:['healthcare' , 'worker' , 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
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
            activeIn:['healthcare', 'worker', 'professional', 'trainee'],
          },
        ],
      }
    ];
  }

  // ==============================================================================
  //       Tab3 Form Json
  // ==============================================================================

  private createTab3FormJson() {
    return [
      {
        title: 'Upload Vertrag Dokumente',
        discription:
          'Only JPG, PNG, DOC, DOCX, CSV, XLS, XLSX, and PDF files are allowed, and the file size must not exceed 5 MB.',
        form: [
          {
            lable: 'Vertrag Perso2',
            formControl: 'vertragPerso2',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Garantie',
            formControl: 'garantie',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datenschutzerklärung',
            formControl: 'datenschutzerklarung',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Optionale Leistung',
            formControl: 'optionaleLeistung',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ],
      },
    ];
  }

  // ==============================================================================
  //       Tab4 Form Json
  // ==============================================================================

  private createTab4FormJson() {
    return [
      {
        title: 'Upload Dokumente',
        discription:
          'Only JPG, PNG, DOC, DOCX, CSV, XLS, XLSX, and PDF files are allowed, and the file size must not exceed 5 MB.',
        form: [
          {
            lable: 'Lebenslauf*',
            formControl: 'tab4Lebenslauf',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Ausweis*',
            formControl: 'tab4Ausweis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional'  , 'trainee'],
          },
          {
            lable: 'B1 Zertifikat',
            formControl: 'tab4B1Zertifikat',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional'  , 'trainee'],
          },
          {
            lable: 'B2 Zertifikat*',
            formControl: 'tab4B2Zertifikat',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee' ],
          },
          {
            lable: 'Imfpung*',
            formControl: 'tab4Imfpung',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee' ],
          },
  
          {
            lable: 'Abitur',
            formControl: 'tab4Abitur',
            type: 'file',
            value: null,
            activeIn:['trainee' ],
          },
          {
            lable: 'Abitur',
            formControl: 'tab4Abitur',
            type: 'file',
            value: null,
            activeIn:['trainee' ],
          },
          {
            lable: 'Notenübersicht Abitur',
            formControl: 'tab4NotenubersichtAbitur',
            type: 'file',
            value: null,
            activeIn:['trainee' ],
          },
  
          {
            lable: 'Voruniversität',
            formControl: 'tab4Voruniversitat',
            type: 'file',
            value: null,
            activeIn:['trainee' ],
          },
  
          {
            lable: 'NotenübersiNotenübersi',
            formControl: 'tab4NotenubersiNotenubersi',
            type: 'file',
            value: null,
            activeIn:['trainee' ],
          },
  
          {
            lable: 'Bechlor*',
            formControl: 'tab4Bechlor',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee'  ],
          },
          {
            lable: 'Notenübersicht Theorie + Praxis*',
            formControl: 'tab4NotenubersichtTheoriePraxis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
          {
            lable: 'Mitgliedsbesch einigung*',
            formControl: 'tab4Mitgliedsbescheinigung',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ],
          },
          {
            lable: 'Mitgliedskarte* ',
            formControl: 'tab4Mitgliedskarte',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
          {
            lable: 'Mitgliedschaft',
            formControl: 'tab4Mitgliedschaft',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
          {
            lable: 'Arbeitszeugnis 1*',
            formControl: 'tab4Arbeitszeugnis1',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
  
          {
            lable: 'Arbeitszeugnis 2',
            formControl: 'tab4Arbeitszeugnis2',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
          {
            lable: 'Arbeitszeugnis 3',
            formControl: 'tab4Arbeitszeugnis3',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ],
          },
          {
            lable: 'Arbeitszeugnis 4',
            formControl: 'tab4Arbeitszeugnis4',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ],
          },
          {
            lable: 'Versicherungs nachweis',
            formControl: 'tab4Versicherungsnachweis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ],
          },
          {
            lable: 'Zertifikat',
            formControl: 'tab4Zertifikat',
            type: 'file',
            value: null,
            activeIn:['healthcare', 'professional' ],
          },
          {
            lable: 'Master abschluss',
            formControl: 'tab4Masterabschluss',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ],
          },
          {
            lable: 'Notenübersicht Master',
            formControl: 'tab4NotenubersichtMaster',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ],
          },
          {
            lable: 'Stellenbeschrei bung*',
            formControl: 'tab4Stellenbeschreibung',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Geburtsurkunde Fachkraft*',
            formControl: 'tab4GeburtsurkundeFachkraft',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Ausweiß Ehepartner*',
            formControl: 'tab4AusweibEhepartner',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Ausweis Kind 1',
            formControl: 'tab4AusweisKind1',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Ausweis Kind 2 und 3',
            formControl: 'tab4AusweisKind1und2',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
  
          {
            lable: 'Heiratsurkunde*',
            formControl: 'tab4Heiratsurkunde',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Geburtsur-kunde Ehemann *',
            formControl: 'tab4GeburtsurkundeEhemann',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
          {
            lable: 'eburtsur-kunde Kind1',
            formControl: 'tab4EburtsurkundeKind1',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Geburtsur-kunde Kind2 und 3',
            formControl: 'tab4GeburtsurkundeKind2und3',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'A1 Zertifikat Ehemann *',
            formControl: 'tab4A1ZertifikatEhemann',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Lebensunterhaltnachweis',
            formControl: 'tab4Lebensunterhaltnachweis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
  
          {
            lable: 'Rentennachweis',
            formControl: 'tab4Rentennachweis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
          {
            lable: 'Sorgerecht',
            formControl: 'tab4Sorgerecht',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Erlaubnis Elternteil',
            formControl: 'tab4ErlaubnisElternteil',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
          {
            lable: 'Sonstiges',
            formControl: 'tab4Sonstiges',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' ,'trainee'],
          },
          {
            lable: 'Weitere Unterlagen 1',
            formControl: 'tab4WeitereUnterlagen1',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee' ],
          },
          {
            lable: 'Weitere Unterlagen 2',
            formControl: 'tab4WeitereUnterlagen2',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional','trainee'],
          },
  
          {
            lable: 'Zertifikat 1',
            formControl: 'tab4Zertifikat1',
            type: 'file',
            value: null,
            activeIn:['worker','trainee'],
          },
          {
            lable: 'Zertifikat 2',
            formControl: 'tab4Zertifikat2',
            type: 'file',
            value: null,
            activeIn:['worker','trainee'],
          },
          {
            lable: 'Zertifikat 3',
            formControl: 'tab4Zertifikat3',
            type: 'file',
            value: null,
            activeIn:['worker','trainee'],
          },
          {
            lable: 'Zertifikat 4',
            formControl: 'tab4Zertifikat4',
            type: 'file',
            value: null,
            activeIn:['worker','trainee'],
          },
          {
            lable: 'Zertifikat 5',
            formControl: 'tab4Zertifikat5',
            type: 'file',
            value: null,
            activeIn:['worker','trainee'],
          },
          {
            lable: 'Zertifikat 6',
            formControl: 'tab4Zertifikat6',
            type: 'file',
            value: null,
            activeIn:['worker','trainee'],
          },
        ],
      },  
    ];
  }

  // ==============================================================================
  //       Tab 5 Form Json
  // ==============================================================================

  private createTab5FormJson() {
    return [
      {
        title: '',
        form: [
          {
            lable: 'Präinterview',
            formControl: 'tab5Prainterview',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Ergebnis',
            formControl: 'tab5Ergebnis',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Ü.1',
            formControl: 'tab5U1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Ü.2',
            formControl: 'tab5U2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Ü.3',
            formControl: 'tab5U3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'CV an AG',
            formControl: 'tab5CvAnAg',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          // {
          //   lable: 'Vorauswahl',
          //   formControl: 'tab5Vorauswahl',
          //   type: 'text',
          //   value: null,
          //   optionLable: 'name',
          //   isRequired: true,
          //   disable: false,
          //   activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          // },
          // {
          //   lable: 'Datum VG',
          //   formControl: 'tab5DatumVg',
          //   type: 'text',
          //   value: null,
          //   optionLable: 'name',
          //   isRequired: true,
          //   disable: false,
          //   activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          // },
          // {
          //   lable: 'ERGEBNIS',
          //   formControl: 'tab5Ergebnis',
          //   type: 'text',
          //   value: null,
          //   optionLable: 'name',
          //   isRequired: true,
          //   disable: false,
          //   activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          // },
        ],
      },
      {
        title: 'CV AG 1',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV1tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV1tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 2',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV2tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV2tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 3',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV3tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV3tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 4',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV4tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV4tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 5',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV5tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV5tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 6',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV6tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV6tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 7',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV7tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV7tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 8',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV8tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV8tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 9',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV9tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV9tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
      {
        title: 'CV AG 10',
        form: [
          {
            lable: 'Vorauswahl',
            formControl: 'CV10tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Datum VG',
            formControl: 'CV10tab5DatumVg',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ]
      },
    ];
  }

  // ==============================================================================
  //       Tab 6 Form Json
  // ==============================================================================

  private createTab6FormJson() {
    return [
      {
        title: '',
        form: [
          {
            lable: 'AnerkenungsBehörde ',
            formControl: 'tab6Anerkenungsbehorde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare'],
          },
          {
            lable: 'Behörde ',
            formControl: 'tab6Behorde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Antrag',
            formControl: 'tab6Antrag',
            type: 'select',
            value: null,
            options: [
              {
                id: 1,
                name: 'Antrag',
              },
              {
                id: 2,
                name: 'Antrag',
              },
            ],
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Antragsdatum',
            formControl: 'tab6Antragsdatum',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Fehlende Unterlagen',
            formControl: 'tab6FehlendeUnterlagen',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'FU Eingereicht am',
            formControl: 'tab6FUEingereichtam',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Vollständig',
            formControl: 'tab6Vollstandig',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Vollständig am',
            formControl: 'tab6Vollstandigam',
            type: 'text',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
  
          {
            lable: 'Antragsformular',
            formControl: 'tab6Antragsformular',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
  
          {
            lable: 'Vollmacht',
            formControl: 'tab6Vollmacht',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
  
          {
            lable: 'Umschreibung',
            formControl: 'tab6Umschreibung',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
  
          {
            lable: 'Verzicht',
            formControl: 'tab6Verzicht',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
          {
            lable: 'Goodstanding',
            formControl: 'tab6Goodstanding',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
          {
            lable: 'Gesundheitszeugnis',
            formControl: 'tab6Gesundheitszeugnis',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
          {
            lable: 'Führungszeugnis',
            formControl: 'tab6Fuhrungszeugnis',
            type: 'file',
            value: null,
            activeIn:['healthcare'],
          },
          {
            lable: 'Bescheid',
            formControl: 'tab6Bescheid',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
        ],
      },
    ];
  }

  // ==============================================================================
  //       Tab 7 Form Json
  // ==============================================================================

  private createTab7FormJson() {
    return [
      {
        title: '',
        form: [
          {
            lable: 'Antrag',
            formControl: 'tab8Antrag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Ausländerbehörde ',
            formControl: 'tab7Anerkenungsbehorde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
  
          {
            lable: 'Antragsdatum',
            formControl: 'tab7Antragsdatum',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'Fehlende Unterlagen',
            formControl: 'tab7FehlendeUnterlagen',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'FU Eingereicht',
            formControl: 'tab7FUEingereicht',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'Vollständig',
            formControl: 'tab7Vollstandig',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'Vereinbarung',
            formControl: 'tab7Vereinbarung1',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'VAZ',
            formControl: 'tab7Vaz',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
  
  
          {
            lable: 'Arbeitsvertrag',
            formControl: 'tab7Arbeitsvertrag',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'VollmachtFachkraft',
            formControl: 'tab7VollmachtFachkraft',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional', 'trainee' ],
          },
          {
            lable: 'Untervollmacht',
            formControl: 'tab7Untervollmacht',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'ErklärungVisa',
            formControl: 'tab7ErklarungVisa',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'EzB (Teil) ',
            formControl: 'tab7EzbTeil',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          }, {
            lable: 'EzB (voll)',
            formControl: 'tab7EzbVoll',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'Zusatzblatt A',
            formControl: 'tab7ZusatzblattA',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'VollmachtEhepartner',
            formControl: 'tab7VollmachtEhepartner',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'VollmachtKinder',
            formControl: 'tab7VollmachtKinder',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'Vereinbarung',
            formControl: 'tab7Vereinbarung2',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'VAZ',
            formControl: 'tab7Vaz212',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
          {
            lable: 'VISA',
            formControl: 'tab7Visa',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional', 'trainee' ],
          },
          {
            lable: 'Einreiseplan',
            formControl: 'tab7Einreiseplan',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee'],
          },
        ],
      }, 
    ];
  }

   // ==============================================================================
  //       Tab 8 Form Json
  // ==============================================================================

  private createTab8FormJson() {
    return [
      {
        title:'',
        form:[
          {
            lable: 'Antrag',
            formControl: 'tab8Antrag',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Zuständige Behörde',
            formControl: 'tab8ZustandigeBehorde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
  
          {
            lable: 'Antragsdatum',
            formControl: 'tab8Antragsdatum',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
         
          {
            lable: 'Fehlende Unterlagen',
            formControl: 'tab8FehlendeUnterlagen',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
  
          {
            lable: 'FU Eingereicht',
            formControl: 'tab8FUEingereicht',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
  
          {
            lable: 'Vollständig',
            formControl: 'tab8Vollstandig',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
  
       
  
          {
            lable: 'Urkunde Orginal',
            formControl: 'tab8UrkundeOrginal',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UrkundePDF',
            formControl: 'tab8UrkundePDF',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Arbeitsvertrag',
            formControl: 'tab8Arbeitsvertrag',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Lebenslauf',
            formControl: 'tab8Lebenslauf',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Bescheid',
            formControl: 'tab8Bescheid',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'B2',
            formControl: 'tab8B2',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Vollmacht',
            formControl: 'tab8Vollmacht',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Führungszeugnis',
            formControl: 'tab8Fuhrungszeugnis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Gesundheitszeugnis',
            formControl: 'tab8Gesundheitszeugnis',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee' ]
          },
          {
            lable: 'Ausweißbeglaubigung',
            formControl: 'tab8Ausweissbeglaubigung',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
        ]
      }
    ]
  }

  // ==============================================================================
  //       Tab 9 Form Json
  // ==============================================================================

  private createTab9FormJson() {
    return [
      {
        title:'',
        form:[
          {
            lable: 'Wer',
            formControl: 'tab9Wer',
            type: 'select',
            value: null,
            options: [
              {
                id: 1,
                name:'Arbeitsgeber'
              },
              {
                id:2,
                name:'Perso 2'
              }
            ],
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Suche',
            formControl: 'tab9Suche',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional', 'trainee']
          },
  
          {
            lable: 'Kaution',
            formControl: 'tab9Kaution',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional', 'trainee']
          },
  
          {
            lable: '1.Miete',
            formControl: 'tab9Miete1',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional', 'trainee']
          },
  
          {
            lable: 'Wohngeberbescheinigung',
            formControl: 'tab9Wohngeberbescheinigung',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional', 'trainee']
          },
          {
            lable: 'Teilzahlung',
            formControl: 'tab9Teilzahlung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Gesamtzahlung ',
            formControl: 'tab9Gesamtzahlung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker' , 'professional' , 'trainee'],
          },
          {
            lable: 'Mietvertrag',
            formControl: 'tab9Mietvertrag',
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional', 'trainee']
          },
          {
            lable: 'Rechnung',
            formControl: 'tab9Rechnung',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional', 'trainee']
          },
        ]
      }
    ]
  }

    // ==============================================================================
  //       Tab 10 Form Json
  // ==============================================================================

  private createTab10FormJson() {
    return [
      {
        title:'Krankenhaus Pdf',
        activeIn:['healthcare'],
        form:[
          {
            lable: '1 Sitzung (+Familie Planung)',
            formControl: 'tab10Sitzung1R1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2. Sitzung',
            formControl: 'tab10Sitzung2R1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: '3. Sitzung',
            formControl: 'tab10Sitzung3R1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4. Sitzung',
            formControl: 'tab10Sitzung4R1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Datein',
            formControl: 'tab10DateinR1',  
            type: 'file',
            value: null,
          },
        ]
      },

      {
        title:'Fachsprache Pdf',
        activeIn:['healthcare'],
        form:[
          {
            lable: '1 Sitzung (+Familie Planung)',
            formControl: 'tab10Sitzung1R2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2. Sitzung',
            formControl: 'tab10Sitzung2R2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: '3. Sitzung',
            formControl: 'tab10Sitzung3R2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4. Sitzung',
            formControl: 'tab10Sitzung4R2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Datein',
            formControl: 'tab10DateinR2',  
            type: 'file',
            value: null,
          },
        ]
      },
      {
        title:'Integrationsbeauftragte 1',
        activeIn:['healthcare'],
        form:[
          {
            lable: '1 Sitzung (+Familie Planung)',
            formControl: 'tab10Sitzung1R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2. Sitzung',
            formControl: 'tab10Sitzung2R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: '3. Sitzung',
            formControl: 'tab10Sitzung3R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4. Sitzung',
            formControl: 'tab10Sitzung4R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Datein',
            formControl: 'tab10DateinR3',  
            type: 'file',
            value: null,
          },
        ]
      },
      {
        title:'Integrationsbeauftragte 2',
        activeIn:['healthcare'],
        form:[
          {
            lable: '1 Sitzung (+Familie Planung)',
            formControl: 'tab10Sitzung1R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2. Sitzung',
            formControl: 'tab10Sitzung2R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: '3. Sitzung',
            formControl: 'tab10Sitzung3R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4. Sitzung',
            formControl: 'tab10Sitzung4R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: 'Datein',
            formControl: 'tab10DateinR4',  
            type: 'file',
            value: null,
          },
        ]
      },
      {
        title:'Fachsprache PDF',
        activeIn:['worker', 'professional' , 'trainee'],
        form:[
          {
            lable: '1 Sitzung (+Familie Planung)',
            formControl: 'tab10Sitzung1R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2. Sitzung',
            formControl: 'tab10Sitzung2R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: '3. Sitzung',
            formControl: 'tab10Sitzung3R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4. Sitzung',
            formControl: 'tab10Sitzung4R3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Datein',
            formControl: 'tab10DateinR3',  
            type: 'file',
            value: null,
          },
        ]
      },
      {
        title:'Perso2',
        activeIn:['worker', 'professional' , 'trainee'],
        form:[
          {
            lable: '1 Sitzung (+Familie Planung)',
            formControl: 'tab10Sitzung1R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2. Sitzung',
            formControl: 'tab10Sitzung2R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: '3. Sitzung',
            formControl: 'tab10Sitzung3R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4. Sitzung',
            formControl: 'tab10Sitzung4R4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },

          {
            lable: 'Datein',
            formControl: 'tab10DateinR4',  
            type: 'file',
            value: null,
          },
        ]
      }
    ]
  }

  // ==============================================================================
  //       Tab 11 Form Json
  // ==============================================================================

  private createTab11FormJson() {
    return [
      {
        title:'',
        form:[
          {
            lable: 'IR GESAMT',
            formControl: 'tab11IrGesamt',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'DE GESAMT',
            formControl: 'tab11IrGesamt',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: '1 Rate',
            formControl: 'tab11Rate1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: '2 Rate',
            formControl: 'tab11Rate2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: '3 Rate',
            formControl: 'tab11Rate3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: '4 Rate',
            formControl: 'tab11Rate4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: '411€',
            formControl: 'tab11411',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Anerkennung',
            formControl: 'tab11Anerkennung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Urkunde',
            formControl: 'tab11Urkunde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Unterkunft',
            formControl: 'tab11Unterkunft',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Familie',
            formControl: 'tab11Familie',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Fahrt',
            formControl: 'tab11Fahrt',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'B2 Prüfung',
            formControl: 'tab11B2Prufung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UPLOAD 1',
            formControl: 'tab11Upload1',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UPLOAD 2',
            formControl: 'tab11Upload2',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UPLOAD 3',
            formControl: 'tab11Upload3',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UPLOAD 4',
            formControl: 'tab11Upload4',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UPLOAD 5',
            formControl: 'tab11Upload5',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'UPLOAD 6',
            formControl: 'tab11Upload6',  
            type: 'file',
            value: null,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
        ]
      } 
    ]
  }

  // ==============================================================================
  //       Tab 12 Form Json
  // ==============================================================================

  private createTab12FormJson() {
    return [
      {
        title:'',
        form:[
          {
            lable: 'Telefon DE',
            formControl: 'tab12TelefonDe',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Adresse DE',
            formControl: 'tab12AdresseDe',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Versicherung',
            formControl: 'tab12Versicherung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
          {
            lable: 'Versicherungsnummer',
            formControl: 'tab12Versicherungsnummer',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
            activeIn:['healthcare','worker', 'professional' , 'trainee']
          },
        ]
      }
    ]
  }

  // ==============================================================================
  //       Common Functions
  // ==============================================================================
  getTab1FormJson() {
    return this.tab1FormJson;
  }

  getTab3FormJson() {
    return this.tab3FormJson;
  }

  getTab4FormJson() {
    return this.tab4FormJson;
  }

  getTab5FormJson() {
    return this.tab5FormJson;
  }

  getTab6FormJson() {
    return this.tab6FormJson;
  }

  getTab7FormJson() {
    return this.tab7FormJson;
  }

  getTab8FormJson() {
    return this.tab8FormJson;
  }

  getTab9FormJson() {
    return this.tab9FormJson;
  }

  getTab10FormJson() {
    return this.tab10FormJson;
  }

  getTab11FormJson() {
    return this.tab11FormJson;
  }

  getTab12FormJson() {
    return this.tab12FormJson;
  }
}
