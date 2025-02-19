import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../Shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isPasswordVisible: boolean = false;
  loginForm!: FormGroup;
  formSubmit: boolean = false;
  loginLoader: boolean = false;

  constructor(private sharedS: SharedService , private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit = true;
    console.log(form.value);

    if (form.valid) {
      const formValue = form.value;
      const apiParams: any = {
        user_name: formValue.email ?? '',
        password: formValue.password ?? '',
      };
      this.loginLoader = true;

      this.sharedS.sendPostRequest('login', apiParams).subscribe({
        next: (res: any) => {
          this.loginLoader = false;
          if (res) {
            this.sharedS.insertData({ key: 'token', val: res.token });
            this.router.navigate(['/']);
          }
        },
        error: (err: any) => {
          this.loginLoader = false;
        },
      });
    }
  }
}
