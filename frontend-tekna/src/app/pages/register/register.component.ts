import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  modalOpen: boolean = false;
  modalMessage: string = '';
  modalBackButton: boolean = false;
  error: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    // Create form with validation and custom validator
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validators: this.matchPasswords }
    );
  }

  // Custom validator to match password and confirmPassword fields
  matchPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };

  // Submit register form to API
  onRegister(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: () => {
          this.redirectToLogin();
        },
        error: (err) => {
          this.openModal('Some error occurred');
          this.error = true;
          console.error('Error: ', err);
        },
      });
    }
  }

  // Navigate to login page
  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  openModal(text: string) {
    this.modalMessage = text;
    this.modalOpen = true;
  }

  handleClose(shouldUpdate: boolean) {
    this.modalOpen = false;
    if (shouldUpdate && !this.error) {
      this.onRegister();
    } else  {
      this.error == false;
    }
  }
}
