import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  userHasToken = false;
  hasTokenPartner = false;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.loggedUser);
       this.router.navigate(['tasks']);
    });
  }

  getTokenStatus() {
    const route = this.route.snapshot.queryParams;

    // if (Object.prototype.hasOwnProperty.call(route, 'token_partner')) {
    //   this.hasTokenPartner = true;
    //   localStorage.removeItem('token');
    // }
    // if (
    // //   this.sharedService.fnUserHasToken() &&
    // //   this.sharedService.fnUserHasValidToken()
    // ) {
    //   this.userHasToken = true;
    // }
  }
}