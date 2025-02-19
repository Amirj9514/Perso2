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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
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
    InputTextModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;
  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  cities: any[] = [];
  formSubmit: boolean = false;

  constructor(private productS: ProductService) {
    this.newApplicationFrom = new FormGroup({
      appledDate: new FormControl(this.todayDate, [Validators.required]),
      enrollment: new FormControl(null, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required ,Validators.email]),
      phone: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl(null, [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
    });

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  ngOnInit(): void {
    this.productS.getProducts().then((data) => {
      this.products = data;
    });
  }

  onSubmit(): void {  
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched(); // Ensure all validation errors appear
      return;
    }
  
    console.log('Form Submitted:', this.newApplicationFrom.value);
    this.visible = false;
  }

  onDelete(product: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
  
    if (confirmDelete) {
      this.products = this.products.filter(p => p !== product);
    }
  }
  
  

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
