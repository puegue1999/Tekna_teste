import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormBuilder,
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
  selector: 'app-viewTasks',
  templateUrl: './viewTasks.component.html',
  styleUrls: ['./viewTasks.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalComponent,
  ],
})
export class ViewTasksComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  tasksForm!: FormGroup;
  isLoading = true;
  isViewMode = true;
  isModalOpen = false;
  modalMessage: string = '';
  showBackButton = true;
  error = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    // Initialize form and load task data
    this.tasksForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      expirationAt: ['', Validators.required],
      userId: [localStorage.getItem('user'), Validators.required],
      externalId: [
        this.route.snapshot.paramMap.get('externalId'),
        Validators.required,
      ],
      finished: [false, Validators.required],
    });
    this.loadTask();
    this.tasksForm.disable();
  }

  /** Fetch task from server and populate form */
  private loadTask(): void {
    this.isLoading = true;
    const { userId, externalId } = this.tasksForm.value;
    this.tasksService.getTask(userId, externalId).subscribe({
      next: (resp) => {
        const task = resp.allTasks;
        this.tasksForm.patchValue({
          title: task.title,
          description: task.description,
          expirationAt: this.formatDate(task.expirationAt),
          finished: task.finished,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching task', err);
        this.isLoading = false;
      },
    });
  }

  /** Convert ISO string to YYYY-MM-DD for date input */
  private formatDate(iso: string): string {
    return new Date(iso).toISOString().substring(0, 10);
  }

  /** Navigate back to tasks list */
  goBack(): void {
    this.router.navigate(['tasks']);
  }

  /** Toggle between view and edit modes */
  toggleEditMode(): void {
    this.isViewMode = !this.isViewMode;
    this.isViewMode ? this.tasksForm.disable() : this.tasksForm.enable();
  }

  /** Submit updated task to server */
  private saveTask(): void {
    const { userId, externalId, ...payload } = this.tasksForm.value;
    this.tasksService.updateTask(userId, externalId, payload).subscribe({
      next: () => {
        this.loadTask();
        this.toggleEditMode();
      },
      error: (err) => {
        this.openModal('Some error occurred');
        this.error = true;
        console.error('Error: ', err);
      },
    });
  }

  /** Open confirmation modal */
  openModal(text: string) {
    this.modalMessage = text;
    this.isModalOpen = true;
  }

  /** Handle modal close event */
  handleModalClose(shouldSave: boolean): void {
    this.isModalOpen = false;
    if (shouldSave && !this.error) this.saveTask();
    else this.error = false;
  }
}
