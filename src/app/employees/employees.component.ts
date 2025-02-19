import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '../Shared/services/product.service';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FlagsService } from '../Shared/services/flags.service';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    TableModule,
    DrawerModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  products: any[] = [];
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;
  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  flags: any[] = [];

  constructor(private productS: ProductService , private flagsS: FlagsService) {
    this.newApplicationFrom = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.flags = this.flagsS.getFlagsList();
  }

  ngOnInit(): void {
    this.productS.getProducts().then((data) => {
      this.products = data;
    });
  }


  onSubmit(form:FormGroup): void {
    console.log('form', form.value);

  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
