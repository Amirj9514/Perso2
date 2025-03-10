import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './integration.component.html',
  styleUrl: './integration.component.scss'
})
export class IntegrationComponent {
  @Output() goBackTriger = new EventEmitter();
  isEdit: boolean = false;

  constructor() {}

  actionTriger(action: string) {

    if(action === 'edit') {
      this.isEdit = !this.isEdit;
    }else if(action === 'save') {
    
    }else if(action === 'back' && this.isEdit) {
      this.isEdit = !this.isEdit;
    }else{
      this.goBackTriger.emit();
    }
  }
}
