import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [FieldsetModule , CommonModule],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.scss'
})
export class ViewDetailComponent {
  @Input() selectedRow: any;
  @Input() Vacances: any;



  returnFirstLetter(user: any): string {
    const first = user.first_name.charAt(0);
    const second = user.last_name.charAt(0);
    return first+second
  }
}
