import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
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
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  products: any[] = [];
  visible: boolean = false;
  isPasswordVisible: boolean = false; // Add this property

  todayDate = new Date();
  newApplicationFrom!: FormGroup;
  flags: any[] = [];
  formSubmit: boolean = false;
  userListloader: boolean = false;

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
    });

    this.flags = this.flagsS.getFlagsList();
    this.roleList = this.CommonS.getRoles();
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
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
            message: 'Employee added successfully',
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

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  // Toggle Password Visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
