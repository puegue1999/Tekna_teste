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
import { TasksService } from '../tasks.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../../shared/modal/modal.component';


@Component({
  selector: 'app-registerTasks',
  templateUrl: './registerTasks.component.html',
  styleUrls: ['./registerTasks.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, ModalComponent],
})
export class RegisterTasksComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  tasksForm!: FormGroup;
  isModalOpen = false;
  modalMessage = '';
  showBackButton = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    // Initialize reactive form with validations
    this.tasksForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      expirationAt: ['', Validators.required],
      userId: [localStorage.getItem('user'), Validators.required],
    });
  }

  /** Send create-task request */
  onRegisterTask(): void {
    if (this.tasksForm.invalid) return;

    this.tasksService.createTask(this.tasksForm.value).subscribe({
      next: (resp) => this.openModal(resp.message),
      error: (err) => {
        console.error('Registration error:', err);
        this.openModal('An error occurred');
      },
    });
  }

  /** Open confirmation modal with given message */
  private openModal(message: string): void {
    this.modalMessage = message;
    this.isModalOpen = true;
  }

  /** Handle modal close event */
  onModalClose(confirmed: boolean): void {
    this.isModalOpen = false;
    if (confirmed) {
      this.navigateBack();
    }
  }

  /** Navigate back to tasks list */
  navigateBack(): void {
    this.router.navigate(['tasks']);
  }
}
