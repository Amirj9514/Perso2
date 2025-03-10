import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { TabSidebarComponent } from './tab-sidebar/tab-sidebar.component';
import { ProzessubersichtComponent } from './prozessubersicht/prozessubersicht.component';
import { VertragPerso2Component } from './vertrag-perso2/vertrag-perso2.component';
import { DokumenteComponent } from './dokumente/dokumente.component';
import { AnerkennungComponent } from './anerkennung/anerkennung.component';
import { UrkundeComponent } from './urkunde/urkunde.component';
import { UnterkunftComponent } from './unterkunft/unterkunft.component';
import { IntegrationComponent } from './integration/integration.component';
import { PersonlicheDatenComponent } from './personliche-daten/personliche-daten.component';
import { VorstellungsgesrpachComponent } from './vorstellungsgesrpach/vorstellungsgesrpach.component';
import { S81aComponent } from './s81a/s81a.component';
import { BuchhaltungComponent } from './buchhaltung/buchhaltung.component';
import { InfoDeComponent } from './info-de/info-de.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    TabsModule,
    TabSidebarComponent,
    ProzessubersichtComponent,
    VertragPerso2Component,
    DokumenteComponent,
    AnerkennungComponent,
    UrkundeComponent,
    UnterkunftComponent,
    IntegrationComponent,
    PersonlicheDatenComponent,
    VorstellungsgesrpachComponent,
    S81aComponent,
    BuchhaltungComponent,
    InfoDeComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  activeTab: number = 1;
  constructor() {}

  toggleTab(event: number) {
    this.activeTab = event;
  }
}
