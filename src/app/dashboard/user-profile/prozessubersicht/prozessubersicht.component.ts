import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { CommonService } from '../../../Shared/services/common.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsJsonService } from '../../../Shared/services/forms-json.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prozessubersicht',
  standalone: true,
  imports: [
    ButtonModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './prozessubersicht.component.html',
  styleUrl: './prozessubersicht.component.scss',
})
export class ProzessubersichtComponent {
  @Output() goBackTriger = new EventEmitter();
  tab1FormJson: any[] = []
  statusList: any[] = [];
  Sprachniveo: any[] = [
    { id: 1, name: 'A1', description: 'Beginner' },
    { id: 3, name: 'B1', description: 'Intermediate' },
    { id: 4, name: 'B2', description: 'Upper Intermediate' },
  ];
  Sprachzertifikat: any[] = [
    { id: 1, name: 'JA B1', description: '' },
    { id: 2, name: 'JA B2', description: '' },
    { id: 3, name: 'TEIL B1', description: '' },
    { id: 4, name: 'TEIL B2', description: '' },
    { id: 5, name: 'NEIN', description: '' },
  ];

  overViewFormGoup!:FormGroup;

  isEdit: boolean = false;

  constructor(private commonS: CommonService , private formsJsonS: FormsJsonService , private router:Router) {
    this.statusList = this.commonS.getColors();
    const formJson = this.formsJsonS.createFormJson();
    this.createForm(formJson);
    this.tab1FormJson = this.formsJsonS.getTab1FormJson();

  }

  createForm(formJson: any) {
    this.overViewFormGoup = new FormGroup({});
    formJson.forEach((form: any) => {
      form.form.forEach((element: any) => {
        this.overViewFormGoup.addControl(element.formControl, new FormControl(element.value));
      });
    });
  }

  returnFeildValue(feild: any) {
    if(feild.type === 'select') {
      return this.overViewFormGoup.get(feild?.formControl)?.value?.name;
    }else{
      return feild.value;
    }
  }

  returnFeildBg(feild: any) {
    if(feild.type === 'select') {
      return this.overViewFormGoup.get(feild?.formControl)?.value?.color;
    }else{
      return '';
    }
  }

  actionTriger(action: string) {
    if (action === 'edit') {
      this.isEdit = !this.isEdit;
    } else if (action === 'save') {
      console.log(this.overViewFormGoup.value);
      
    } else if (action === 'back' && this.isEdit) {
      this.isEdit = !this.isEdit;
    } else {
      this.router.navigate(['/'])
      // this.goBackTriger.emit();
    }
  }
}
