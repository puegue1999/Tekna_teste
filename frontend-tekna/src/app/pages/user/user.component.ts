import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from '../user/user.service';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/modal/modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
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
  isLoading: boolean = true;
  view: boolean = true;
  modalOpen: boolean = false;
  modalMessage: string = 'Deseja salvar as alterações?';
  modalBackButton: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      externalId: localStorage.getItem('user') ?? undefined,
    });
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUser(this.userForm.value.externalId).subscribe({
      next: (data) => {
        const user = data.user;
        this.userForm.patchValue({
          email: user.email,
          name: user.name,
        });
        this.isLoading = false;
        this.userForm.disable();
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  setViewMode() {
    this.view = !this.view;
    this.view ? this.userForm.disable() : this.userForm.enable();
  }

  updateUser() {
    this.isLoading = true;
    this.userService
      .updateUser(this.userForm.value.externalId, this.userForm.value)
      .subscribe({
        next: (data) => {
          this.getUser();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }

  openModal() {
    this.modalOpen = true;
  }

  handleClose(shouldUpdate: boolean) {
    this.modalOpen = false;
    if (shouldUpdate) {
      this.setViewMode();
      this.updateUser();
    }
  }

  logout() {
    this.authService.logout();
  }
}
