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
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-tasks',
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
  faEye = faEye;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  userToken?: string;
  listTasks: Task[] = [];
  page: number = 1;
  totalPages: number = 1;
  isLoading: boolean = true;
  modalOpen: boolean = false;
  modalMessage: string = 'Deseja excluir esta task?';
  modalBackButton: boolean = true;
  deleteExternalId: string = '';
  orderByOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Expiration At', value: 'expirationAt' },
  ];
  selectedOrderBy: string = 'title';
  orderDirectionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];
  selectedOrderDirection: string = 'asc';
  finishedOptions = [
    { label: 'Completed', value: 'finished' },
    { label: 'Pending', value: 'pending' },
    { label: 'No select', value: 'noSelect' },
  ];
  selectedFinished: string = 'noSelect';
  search = new FormControl('');

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.userToken = localStorage.getItem('user') ?? undefined;
    this.getAllTasks();
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.getOptions();
      });
  }

  previousPage() {
    this.page--;
    this.getAllTasks();
  }

  nextPage() {
    this.page++;
    this.getAllTasks();
  }

  getOptions() {
    this.page = 1;
    this.getAllTasks();
  }

  getAllTasks() {
    this.isLoading = true;
    this.tasksService
      .getAllTasks(
        this.userToken,
        this.page,
        this.selectedOrderBy,
        this.selectedOrderDirection,
        this.selectedFinished,
        this.search.value === '' ? 'all' : this.search.value
      )
      .subscribe({
        next: (data) => {
          this.listTasks = (data.allTasks.tasks ?? []).map((task: Task) => ({
            externalId: task.externalId,
            title: task.title,
            description: task.description,
            expirationAt: new Date(task.expirationAt),
            finished: task.finished,
          }));
          this.totalPages = data.allTasks.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }

  openModalDelete(externalId: string) {
    this.modalOpen = true;
    this.deleteExternalId = externalId;
  }

  handleClose(shouldUpdate: boolean) {
    this.modalOpen = false;
    if (shouldUpdate) {
      this.deleteTask();
    }
  }

  deleteTask() {
    this.isLoading = true;
    this.tasksService.deleteTasks(this.deleteExternalId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.deleteExternalId = '';
        this.getAllTasks();
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas', err);
        this.isLoading = false;
        this.deleteExternalId = '';
      },
    });
  }

  toRegisterTasks() {
    this.router.navigate(['tasks/new']);
  }

  toViewTasks(externalId: string) {
    this.router.navigate([`tasks/view/${externalId}`]);
  }
}
