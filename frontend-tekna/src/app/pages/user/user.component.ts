import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../user/user.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/modal/modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,  // enable standalone usage
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    ModalComponent,
  ],
})
export class UserComponent implements OnInit {
  faUser = faUser;
  userForm!: FormGroup;
  isLoading = true;
  isViewMode = true;
  isModalOpen = false;
  modalMessage = 'Do you want to save changes?';
  showBackButton = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize form and load user data
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      externalId: localStorage.getItem('user') ?? undefined,
    });
    this.loadUser();
  }

  /** Fetch user data and populate form */
  private loadUser(): void {
    this.isLoading = true;
    const userId = this.userForm.value.externalId;
    this.userService.getUser(userId).subscribe({
      next: (resp) => {
        const user = resp.user;
        this.userForm.patchValue({
          email: user.email,
          name: user.name,
        });
        this.userForm.disable();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  /** Toggle between view and edit modes */
  toggleEditMode(): void {
    this.isViewMode = !this.isViewMode;
    this.isViewMode ? this.userForm.disable() : this.userForm.enable();
  }

  /** Submit updated user data */
  saveUser(): void {
    if (this.userForm.invalid) return;

    this.isLoading = true;
    const { externalId, ...payload } = this.userForm.value;
    this.userService.updateUser(externalId, payload).subscribe({
      next: () => {
        this.loadUser();    // reload fresh data
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // optional: show error notification
      },
    });
  }

  /** Open confirmation modal */
  openModal(): void {
    this.isModalOpen = true;
  }

  /** Handle modal close; save if confirmed */
  onModalClose(confirmed: boolean): void {
    this.isModalOpen = false;
    if (confirmed) {
      this.toggleEditMode();
      this.saveUser();
    }
  }

  /** Log out the current user */
  logout(): void {
    this.authService.logout();
  }
}
