import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileInputComponent } from '../../../Shared/components/file-input/file-input.component';
import { FormsJsonService } from '../../../Shared/services/forms-json.service';

@Component({
  selector: 'app-dokumente',
  standalone: true,
  imports: [ButtonModule, FileInputComponent],
  templateUrl: './dokumente.component.html',
  styleUrl: './dokumente.component.scss',
})
export class DokumenteComponent {
  @Input() applicant: any;
  @Input() categoory: string = 'healthcare';
  @Output() goBackTriger = new EventEmitter();
  isEdit: boolean = false;
  tab2FormJson: any[] = [];

  constructor(private formsJsonS: FormsJsonService) {}

  ngOnInit(): void {
    this.tab2FormJson = this.formsJsonS.getTab4FormJson();
  }

  onFileUpload(event: any) {
    console.log(event);
  }

  onFileDelete(event: any) {
    console.log(event);
  }

  actionTriger(action: string) {
    if (action === 'edit') {
      this.isEdit = !this.isEdit;
    } else if (action === 'save') {
    } else if (action === 'back' && this.isEdit) {
      this.isEdit = !this.isEdit;
    } else {
      this.goBackTriger.emit();
    }
  }
}
