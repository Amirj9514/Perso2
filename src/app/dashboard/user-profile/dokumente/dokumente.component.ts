import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileInputComponent } from '../../../Shared/components/file-input/file-input.component';
import { FormsJsonService } from '../../../Shared/services/forms-json.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dokumente',
  standalone: true,
  imports: [ButtonModule, FileInputComponent],
  templateUrl: './dokumente.component.html',
  styleUrl: './dokumente.component.scss',
})
export class DokumenteComponent implements OnChanges {
  @Input() applicant: any;
  @Input() userDetail: any = null;
  @Input() categoory: string = 'healthcare';
  @Output() goBackTriger = new EventEmitter();
  isEdit: boolean = false;
  tab2FormJson: any[] = [];
  onlyView: boolean = false;

  constructor(private formsJsonS: FormsJsonService , private router:Router) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userDetail'].currentValue) {
      this.onlyView = this.userDetail?.role === 'viewer' ? true : false;
    }
  }
  ngOnInit(): void {
    this.tab2FormJson = this.formsJsonS.getTab4FormJson();
  }

  onFileUpload(event: any) {

  }

  onFileDelete(event: any) {

  }

  actionTriger(action: string) {
    if (action === 'edit') {
      this.isEdit = !this.isEdit;
    } else if (action === 'save') {
    } else if (action === 'back' && this.isEdit) {
      this.isEdit = !this.isEdit;
    } else {
      this.router.navigate(['/']);
      // this.goBackTriger.emit();
    }
  }

  includeTheRole(row:any){
    const data = this.categoory;
    if(!row?.activeIn) return true;
    if(row?.activeIn.includes(data)) return true;
    return false;
  }
}
