import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../tasks/tasks.service';
import { CommonModule } from '@angular/common';
import { Task } from './tasks';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faTrash,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,  // make this a standalone component
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [
    CommonModule,
    LoadingComponent,
    FontAwesomeModule,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TasksComponent implements OnInit {
  // icons
  faEye = faEye;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  // state
  userToken?: string;
  tasks: Task[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = true;

  // modal
  isModalOpen = false;
  modalMessage = '';
  showBackButton = true;
  taskToDeleteId = '';

  // filters & sorting
  orderByOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Expiration Date', value: 'expirationAt' },
  ];
  selectedOrderBy = 'title';

  orderDirectionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];
  selectedOrderDirection = 'asc';

  statusOptions = [
    { label: 'Completed', value: 'finished' },
    { label: 'Pending', value: 'pending' },
    { label: 'All', value: 'all' },
  ];
  selectedStatus = 'all';

  // search control with debounce
  searchControl = new FormControl('');

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {
    // load user token and initial list
    this.userToken = localStorage.getItem('user') ?? undefined;
    this.loadTasks();

    // reload on search text change
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.applyFilters());
  }

  /** Load tasks from backend with current filters, sorting and pagination */
  loadTasks(): void {
    this.isLoading = true;
    const query = this.searchControl.value?.trim() || 'all';

    this.tasksService
      .getAllTasks(
        this.userToken,
        this.currentPage,
        this.selectedOrderBy,
        this.selectedOrderDirection,
        this.selectedStatus,
        query
      )
      .subscribe({
        next: (resp) => {
          const payload = resp.allTasks;
          this.tasks = (payload.tasks || []).map((t: Task) => ({
            ...t,
            expirationAt: new Date(t.expirationAt),
          }));
          this.totalPages = payload.totalPages;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          // optionally show error notification
        },
      });
  }

  /** Go to previous page if possible */
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTasks();
    }
  }

  /** Go to next page if possible */
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTasks();
    }
  }

  /** Reset to first page and reload with new filters */
  applyFilters(): void {
    this.currentPage = 1;
    this.loadTasks();
  }

  /** Open confirmation modal to delete task */
  openDeleteModal(externalId: string, text: string): void {
    this.modalMessage = text;
    this.taskToDeleteId = externalId;
    this.isModalOpen = true;
  }

  /** Handle modal close; delete task if confirmed */
  onModalClose(confirmed: boolean): void {
    this.isModalOpen = false;
    if (confirmed) {
      this.deleteTask();
    }
  }

  /** Delete selected task and refresh list */
  deleteTask(): void {
    this.isLoading = true;
    this.tasksService.deleteTask(this.taskToDeleteId).subscribe({
      next: () => {
        this.taskToDeleteId = '';
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error deleting task', err);
        this.isLoading = false;
        this.taskToDeleteId = '';
      },
    });
  }

  /** Navigate to the "create new task" page */
  navigateToCreate(): void {
    this.router.navigate(['tasks/new']);
  }

  /** Navigate to the task detail view */
  navigateToDetail(externalId: string): void {
    this.router.navigate([`tasks/view/${externalId}`]);
  }
}
