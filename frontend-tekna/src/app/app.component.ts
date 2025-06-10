import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isDashboardRoute = false;

  userName: string = '';
  userToken: string | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDashboardRoute = event.url.startsWith('/login');
      }
    });
  }

  ngOnInit(): void {
    this.userToken = localStorage.getItem('user') ?? undefined;
  }

  gotToDashboard() {
    this.router.navigate(['/login']);
  }

  isPageNotFound(): boolean {
    return this.router.url === '/page-not-found';
  }
}
