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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  registerUser() {
    this.registerService.register(this.registerForm.value).subscribe(() => {
      this.toLogin();
    });
  }

  toLogin() {
    this.router.navigate(['login']);
  }
}