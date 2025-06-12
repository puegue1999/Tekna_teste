import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Navigate to the user profile page
  navigateToUser(): void {
    this.router.navigate(['user']);
  }

  // Navigate to the homepage (tasks)
  navigateToHome(): void {
    this.router.navigate(['tasks']);
  }
}
