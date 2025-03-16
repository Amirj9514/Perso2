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
    // this.tab10FormJson = this.createTab10FormJson();
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
        ],
      },
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
          },
          {
            lable: 'Garantie',
            formControl: 'garantie',
            type: 'file',
            value: null,
          },
          {
            lable: 'Datenschutzerklärung',
            formControl: 'datenschutzerklarung',
            type: 'file',
            value: null,
          },
          {
            lable: 'Optionale Leistung',
            formControl: 'optionaleLeistung',
            type: 'file',
            value: null,
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
          },
          {
            lable: 'Ausweis*',
            formControl: 'tab4Ausweis',
            type: 'file',
            value: null,
          },
          {
            lable: 'B1 Zertifikat',
            formControl: 'tab4B1Zertifikat',
            type: 'file',
            value: null,
          },
          {
            lable: 'B2 Zertifikat*',
            formControl: 'tab4B2Zertifikat',
            type: 'file',
            value: null,
          },
          {
            lable: 'Imfpung*',
            formControl: 'tab4Imfpung',
            type: 'file',
            value: null,
          },

          {
            lable: 'Bechlor*',
            formControl: 'tab4Bechlor',
            type: 'file',
            value: null,
          },
          {
            lable: 'Notenübersicht Theorie + Praxis*',
            formControl: 'tab4NotenubersichtTheoriePraxis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Mitgliedsbesch einigung*',
            formControl: 'tab4Mitgliedsbescheinigung',
            type: 'file',
            value: null,
          },
          {
            lable: 'Mitgliedskarte* ',
            formControl: 'tab4Mitgliedskarte',
            type: 'file',
            value: null,
          },
          {
            lable: 'Mitgliedschaft',
            formControl: 'tab4Mitgliedschaft',
            type: 'file',
            value: null,
          },
          {
            lable: 'Arbeitszeugnis 1*',
            formControl: 'tab4Arbeitszeugnis1',
            type: 'file',
            value: null,
          },

          {
            lable: 'Arbeitszeugnis 2',
            formControl: 'tab4Arbeitszeugnis2',
            type: 'file',
            value: null,
          },
          {
            lable: 'Arbeitszeugnis 3',
            formControl: 'tab4Arbeitszeugnis3',
            type: 'file',
            value: null,
          },
          {
            lable: 'Arbeitszeugnis 4',
            formControl: 'tab4Arbeitszeugnis4',
            type: 'file',
            value: null,
          },
          {
            lable: 'Versicherungs nachweis',
            formControl: 'tab4Versicherungsnachweis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Zertifikat',
            formControl: 'tab4Zertifikat',
            type: 'file',
            value: null,
          },
          {
            lable: 'Master abschluss',
            formControl: 'tab4Masterabschluss',
            type: 'file',
            value: null,
          },
          {
            lable: 'Notenübersicht Master',
            formControl: 'tab4NotenubersichtMaster',
            type: 'file',
            value: null,
          },
          {
            lable: 'Stellenbeschrei bung*',
            formControl: 'tab4Stellenbeschreibung',
            type: 'file',
            value: null,
          },
          {
            lable: 'Geburtsurkunde Fachkraft*',
            formControl: 'tab4GeburtsurkundeFachkraft',
            type: 'file',
            value: null,
          },
          {
            lable: 'Ausweiß Ehepartner*',
            formControl: 'tab4AusweibEhepartner',
            type: 'file',
            value: null,
          },
          {
            lable: 'Ausweis Kind 1',
            formControl: 'tab4AusweisKind1',
            type: 'file',
            value: null,
          },
          {
            lable: 'Ausweis Kind 2 und 3',
            formControl: 'tab4AusweisKind1und2',
            type: 'file',
            value: null,
          },

          {
            lable: 'Heiratsurkunde*',
            formControl: 'tab4Heiratsurkunde',
            type: 'file',
            value: null,
          },
          {
            lable: 'Geburtsur-kunde Ehemann *',
            formControl: 'tab4GeburtsurkundeEhemann',
            type: 'file',
            value: null,
          },
          {
            lable: 'eburtsur-kunde Kind1',
            formControl: 'tab4EburtsurkundeKind1',
            type: 'file',
            value: null,
          },
          {
            lable: 'Geburtsur-kunde Kind2 und 3',
            formControl: 'tab4GeburtsurkundeKind2und3',
            type: 'file',
            value: null,
          },
          {
            lable: 'A1 Zertifikat Ehemann *',
            formControl: 'tab4A1ZertifikatEhemann',
            type: 'file',
            value: null,
          },
          {
            lable: 'Lebensunterhaltnachweis',
            formControl: 'tab4Lebensunterhaltnachweis',
            type: 'file',
            value: null,
          },

          {
            lable: 'Rentennachweis',
            formControl: 'tab4Rentennachweis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Sorgerecht',
            formControl: 'tab4Sorgerecht',
            type: 'file',
            value: null,
          },
          {
            lable: 'Erlaubnis Elternteil',
            formControl: 'tab4ErlaubnisElternteil',
            type: 'file',
            value: null,
          },
          {
            lable: 'Sonstiges',
            formControl: 'tab4Sonstiges',
            type: 'file',
            value: null,
          },
          {
            lable: 'Weitere Unterlagen 1',
            formControl: 'tab4WeitereUnterlagen1',
            type: 'file',
            value: null,
          },
          {
            lable: 'Weitere Unterlagen 2',
            formControl: 'tab4WeitereUnterlagen2',
            type: 'file',
            value: null,
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
          },
          {
            lable: 'Ergebnis',
            formControl: 'tab5Ergebnis',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Ü.1',
            formControl: 'tab5U1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Ü.2',
            formControl: 'tab5U2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Ü.3',
            formControl: 'tab5U3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'CV an AG',
            formControl: 'tab5CvAnAg',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Vorauswahl',
            formControl: 'tab5Vorauswahl',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Datum VG',
            formControl: 'tab5DatumVg',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'ERGEBNIS',
            formControl: 'tab5Ergebnis',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
        ],
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
          },
          {
            lable: 'Antragsdatum',
            formControl: 'tab6Antragsdatum',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
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
          },
          {
            lable: 'FU Eingereicht',
            formControl: 'tab6FUEingereicht',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
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
          },

          {
            lable: 'Antragsformular',
            formControl: 'tab6Antragsformular',
            type: 'file',
            value: null,
          },

          {
            lable: 'Vollmacht',
            formControl: 'tab6Vollmacht',
            type: 'file',
            value: null,
          },

          {
            lable: 'Umschreibung',
            formControl: 'tab6Umschreibung',
            type: 'file',
            value: null,
          },

          {
            lable: 'Verzicht',
            formControl: 'tab6Verzicht',
            type: 'file',
            value: null,
          },
          {
            lable: 'Goodstanding',
            formControl: 'tab6Goodstanding',
            type: 'file',
            value: null,
          },
          {
            lable: 'Gesundheitszeugnis',
            formControl: 'tab6Gesundheitszeugnis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Führungszeugnis',
            formControl: 'tab6Fuhrungszeugnis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Bescheid',
            formControl: 'tab6Bescheid',
            type: 'file',
            value: null,
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
            lable: 'Ausländerbehörde ',
            formControl: 'tab7Anerkenungsbehorde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
  
          {
            lable: 'Antragsdatum',
            formControl: 'tab7Antragsdatum',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Fehlende Unterlagen',
            formControl: 'tab7FehlendeUnterlagen',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'FU Eingereicht',
            formControl: 'tab7FUEingereicht',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
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
          },


          {
            lable: 'Arbeitsvertrag',
            formControl: 'tab7Arbeitsvertrag',
            type: 'file',
            value: null,
          },
          {
            lable: 'VollmachtFachkraft',
            formControl: 'tab7VollmachtFachkraft',
            type: 'file',
            value: null,
          },
          {
            lable: 'Untervollmacht',
            formControl: 'tab7Untervollmacht',
            type: 'file',
            value: null,
          },
          {
            lable: 'ErklärungVisa',
            formControl: 'tab7ErklarungVisa',
            type: 'file',
            value: null,
          },
          {
            lable: 'EzB (Teil) ',
            formControl: 'tab7EzbTeil',
            type: 'file',
            value: null,
          }, {
            lable: 'EzB (voll)',
            formControl: 'tab7EzbVoll',
            type: 'file',
            value: null,
          },
          {
            lable: 'Zusatzblatt A',
            formControl: 'tab7ZusatzblattA',
            type: 'file',
            value: null,
          },
          {
            lable: 'VollmachtEhepartner',
            formControl: 'tab7VollmachtEhepartner',
            type: 'file',
            value: null,
          },
          {
            lable: 'VollmachtKinder',
            formControl: 'tab7VollmachtKinder',
            type: 'file',
            value: null,
          },
          {
            lable: 'Vereinbarung',
            formControl: 'tab7Vereinbarung2',
            type: 'file',
            value: null,
          },
          {
            lable: 'VAZ',
            formControl: 'tab7Vaz212',
            type: 'file',
            value: null,
          },
          {
            lable: 'VISA',
            formControl: 'tab7Visa',
            type: 'file',
            value: null,
          },
          {
            lable: 'Einreiseplan',
            formControl: 'tab7Einreiseplan',
            type: 'file',
            value: null,
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
            lable: 'Zuständige Behörde',
            formControl: 'tab8ZustandigeBehorde',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
  
          {
            lable: 'Antragsdatum',
            formControl: 'tab8Antragsdatum',
            type: 'date',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
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
          },

          {
            lable: 'UrkundePDF',
            formControl: 'tab8UrkundePDF',
            type: 'select',
            value: null,
            options: this.statusList,
            optionLable: 'name',
            isRequired: true,
            disable: false,
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
          },
          {
            lable: 'Arbeitsvertrag',
            formControl: 'tab8Arbeitsvertrag',
            type: 'file',
            value: null,
          },
          {
            lable: 'Lebenslauf',
            formControl: 'tab8Lebenslauf',
            type: 'file',
            value: null,
          },
          {
            lable: 'Bescheid',
            formControl: 'tab8Bescheid',
            type: 'file',
            value: null,
          },
          {
            lable: 'B2',
            formControl: 'tab8B2',
            type: 'file',
            value: null,
          },
          {
            lable: 'Vollmacht',
            formControl: 'tab8Vollmacht',
            type: 'file',
            value: null,
          },
          {
            lable: 'Führungszeugnis',
            formControl: 'tab8Fuhrungszeugnis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Gesundheitszeugnis',
            formControl: 'tab8Gesundheitszeugnis',
            type: 'file',
            value: null,
          },
          {
            lable: 'Gesundheitszeugnis',
            formControl: 'tab8Gesundheitszeugnis',  
            type: 'file',
            value: null,
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
          },
          {
            lable: 'Mietvertrag',
            formControl: 'tab9Mietvertrag',
            type: 'file',
            value: null,
          },
          {
            lable: 'Rechnung',
            formControl: 'tab9Rechnung',  
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
          },
          {
            lable: 'DE GESAMT',
            formControl: 'tab11IrGesamt',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '1 Rate',
            formControl: 'tab11Rate1',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '2 Rate',
            formControl: 'tab11Rate2',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '3 Rate',
            formControl: 'tab11Rate3',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '4 Rate',
            formControl: 'tab11Rate4',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: '411€',
            formControl: 'tab11411',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Anerkennung',
            formControl: 'tab11Anerkennung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'UPLOAD 1',
            formControl: 'tab11Upload1',  
            type: 'file',
            value: null,
          },
          {
            lable: 'UPLOAD 2',
            formControl: 'tab11Upload2',  
            type: 'file',
            value: null,
          },
          {
            lable: 'UPLOAD 3',
            formControl: 'tab11Upload3',  
            type: 'file',
            value: null,
          },
          {
            lable: 'UPLOAD 4',
            formControl: 'tab11Upload4',  
            type: 'file',
            value: null,
          },
          {
            lable: 'UPLOAD 5',
            formControl: 'tab11Upload5',  
            type: 'file',
            value: null,
          },
          {
            lable: 'UPLOAD 6',
            formControl: 'tab11Upload6',  
            type: 'file',
            value: null,
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
          },
          {
            lable: 'Adresse DE',
            formControl: 'tab12AdresseDe',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Versicherung',
            formControl: 'tab12Versicherung',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
          },
          {
            lable: 'Versicherungsnummer',
            formControl: 'tab12Versicherungsnummer',
            type: 'text',
            value: null,
            optionLable: 'name',
            isRequired: true,
            disable: false,
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
