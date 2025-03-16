import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-personliche-daten',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './personliche-daten.component.html',
  styleUrl: './personliche-daten.component.scss'
})
export class PersonlicheDatenComponent {

}
