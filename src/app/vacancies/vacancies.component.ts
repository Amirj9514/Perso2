import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '../Shared/services/product.service';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FlagsService } from '../Shared/services/flags.service';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule,
    TableModule,
    DrawerModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    TextareaModule
  ],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit {
  products: any[] = [];
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  newApplicationFrom!: FormGroup;
  flags: any[] = [];
formSubmit: boolean|undefined;


  constructor(private productS: ProductService , private flagS:FlagsService) {
    this.newApplicationFrom = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      company: new FormControl('', [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      description: new FormControl(null,[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.productS.getProducts().then((data) => {
      this.products = data;
    });
    this.flags = this.flagS.getFlagsList();
  }

  onSubmit(form: FormGroup): void {
    console.log('form', form.value);
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
