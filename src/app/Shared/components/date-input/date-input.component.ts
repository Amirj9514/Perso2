import { Component, forwardRef, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, ReactiveFormsModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  value: string = '';
  dateError: string = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value = this.formatToDisplay(value);
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.dateError) {
      return { invalidDate: this.dateError };
    }
    return null;
  }

  formatDate(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 2) {
      value = value.substring(0, 2) + '-' + value.substring(2);
    }
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5);
    }

    this.value = value.substring(0, 10); // Ensure max length DD-MM-YYYY
    event.target.value = this.value; // Reflect trimmed value in input

    if (!this.value) {
      this.dateError = 'Date is required';
      this.onChange('');
      return;
    }

    if (this.value.length < 10) {
      this.dateError = 'Incomplete date';
      this.onChange('');
      return;
    }

    this.validateDate(this.value);
  }

  validateDate(date: string) {
    this.dateError = '';

    const dateParts = date.split('-');
    if (dateParts.length !== 3) {
      this.dateError = 'Invalid date format';
      this.onChange('');
      return;
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      this.dateError = 'Invalid date format';
    } else if (month < 1 || month > 12) {
      this.dateError = 'Month must be between 1 and 12';
    } else if (day < 1 || day > 31) {
      this.dateError = 'Day must be between 1 and 31';
    } else if (year.toString().length !== 4) {
      this.dateError = 'Year must be 4 digits';
    } else {
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        this.dateError = `Invalid day for the selected month`;
      }
    }

    this.onChange(this.dateError ? '' : this.value);
  }
  formatToModel(date: string): string {
    // Convert DD-MM-YYYY to YYYY-MM-DD (model format)
    const parts = date.split('-');
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    return date;
  }

  formatToDisplay(date: string): string {
    // Convert YYYY-MM-DD (model format) to DD-MM-YYYY (display format)
    const parts = date.split('-');
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    return date;
  }
}
