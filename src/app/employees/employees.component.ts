import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
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
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { SharedService } from '../Shared/services/shared.service';
import { CommonService } from '../Shared/services/common.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CustomToastService } from '../Shared/services/custom-toast.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    PasswordModule,
    TableModule,
    DrawerModule,
    ButtonModule,
    FieldsetModule,
    SelectModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    SkeletonModule,
    IconFieldModule,
    InputIconModule,
    Dialog
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  @ViewChild('dt2') dt2!: Table;
  products: any[] = [];
  visible: boolean = false;
  isPasswordVisible: boolean = false; // Add this property

  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  flags: any[] = [];
  formSubmit: boolean = false;
  userListloader: boolean = false;
  selectedRow: any = null;
  showDialoag: boolean = false;
  deleteLoader: boolean = false;

  roleList: any[] = [];
  constructor(
    private flagsS: FlagsService,
    private sharedS: SharedService,
    private CommonS: CommonService,
    private toastS: CustomToastService
  ) {
    this.newApplicationFrom = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      user_name: new FormControl('', [Validators.required]),
      role_code: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      company: new FormControl({value: null, disabled: true}),
    });

    this.flags = this.flagsS.getFlagsList();
    this.roleList = this.CommonS.getRoles();
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  handelSearch(event: any) {
    const value = event.target.value;
    this.dt2.filterGlobal(value, 'contains');
  }

  onSubmit(): void {
    if (this.newApplicationFrom.invalid) {
      this.newApplicationFrom.markAllAsTouched();
      return;
    }

    const apiParam = {
      ...this.newApplicationFrom.value,
      role_code: this.newApplicationFrom.value.role_code.value,
    };

    this.formSubmit = true;
    this.sharedS.sendPostRequest('users', apiParam).subscribe({
      next: (res: any) => {
        this.formSubmit = false;
        if (res.status === 200) {
          this.visible = false;
          this.newApplicationFrom.reset();
          this.getEmployeeDetails();
          this.toastS.setToast({
            show: true,
            message: 'Datensatz erfolgreich hinzugefügt',
          });
          return;
        }

        this.toastS.setToast({
          show: true,
          message: res?.body?.message ?? 'Something went wrong',
          severity: 'error',
        });
      },
      error: (error) => {
        this.formSubmit = false;
      },
    });
  }

  getEmployeeDetails(): void {
    // ?first_name=${''}&last_name=${''}&email=${''}&user_name=${''}'
    const url = `users`;
    this.userListloader = true;
    this.products = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
    this.sharedS.sendGetRequest(url).subscribe({
      next: (resp) => {
        this.userListloader = false;
        if (resp.status === 200) {
          this.products = resp?.body?.users ?? [];
        } else {
          this.products = [];
        }
      },
      error: (error) => {
        this.userListloader = false;
        this.products = [];
      },
    });
  }


  deleteRole(product: any): void {
    this.selectedRow = product;
    this.showDialoag = true;
  }

  onAccept(): void {
    this.deleteLoader = true;
    this.sharedS
      .sendDeleteRequest(`users/${this.selectedRow.id}`)
      .subscribe({
        next: (response) => {
          this.deleteLoader = false;
          if (response.status === 200) {
            this.products.findIndex((item, index) => {
              if (item.id === this.selectedRow.id) {
                this.products.splice(index, 1);
                this.showDialoag = false;
                this.selectedRow = null;
                this.toastS.setToast({
                  show: true,
                  message: 'Datensatz erfolgreich gelöscht',
                });
                return;
              }
            });
          }
        },
        error: (error) => {
          this.deleteLoader = false;
     
        },
      });
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  // Toggle Password Visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onRoleChange(event:any){
    this.newApplicationFrom.controls['company'].setValue(null);
    if(event.value === 'viewer'){   
      this.newApplicationFrom.controls['company'].enable();
      this.newApplicationFrom.controls['company'].setValidators([Validators.required]);
      this.newApplicationFrom.controls['company'].updateValueAndValidity();
    }else{
      this.newApplicationFrom.controls['company'].disable();
      
      this.newApplicationFrom.controls['company'].removeValidators([Validators.required]);
      this.newApplicationFrom.controls['company'].updateValueAndValidity();
    }
  }
  
}
