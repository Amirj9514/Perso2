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
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,PasswordModule,
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
  isPasswordVisible: boolean = false;  // Add this property

  @ViewChild('drawerRef') drawerRef!: Drawer;
  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  flags: any[] = [];
  formSubmit: boolean = false;

  constructor(private productS: ProductService, private flagsS: FlagsService) {
    this.newApplicationFrom = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
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

  onSubmit(): void {
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched(); 
      return;
    }

    console.log('Form Submitted:', this.newApplicationFrom.value);
    this.visible = false;
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  // Toggle Password Visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

