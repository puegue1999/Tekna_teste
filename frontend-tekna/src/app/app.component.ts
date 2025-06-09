import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDashboardRoute = false;

  userName: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDashboardRoute = event.url.startsWith('/login');
      }
    });
  }

  gotToDashboard() {
    this.router.navigate(['/login']);
  }

  isPageNotFound(): boolean {
    return this.router.url === '/page-not-found';
  }
}
