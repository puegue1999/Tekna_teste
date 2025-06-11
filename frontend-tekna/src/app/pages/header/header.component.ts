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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toUser() {
    this.router.navigate(['user']);
  }

  toHome() {
    this.router.navigate(['tasks']);
  }
}
