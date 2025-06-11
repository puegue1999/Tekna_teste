import { Component, OnInit, ViewChild } from '@angular/core';
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
  isLoading: boolean = true;
  view: boolean = true;
  modalOpen: boolean = false;
  modalMessage: string = 'Deseja salvar as alterações?';
  modalBackButton: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.tasksForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      expirationAt: ['', [Validators.required]],
      userId: [localStorage.getItem('user'), [Validators.required]],
      externalId: [
        this.route.snapshot.paramMap.get('externalId'),
        [Validators.required],
      ],
      finished: [false, [Validators.required]],
    });
    this.getTasks();
    this.tasksForm.disable();
  }

  getTasks() {
    this.isLoading = true;
    this.tasksService
      .getTasks(this.tasksForm.value.userId, this.tasksForm.value.externalId)
      .subscribe({
        next: (data) => {
          const task = data.allTasks;
          this.tasksForm.patchValue({
            title: task.title,
            description: task.description,
            expirationAt: this.formatDate(task.expirationAt),
            finished: task.finished,
          });
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar tarefas', err);
          this.isLoading = false;
        },
      });
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString().substring(0, 10);
  }

  goingBack() {
    this.router.navigate(['tasks']);
  }

  setViewMode() {
    this.view = !this.view;
    this.view ? this.tasksForm.disable() : this.tasksForm.enable();
  }

  updateTask() {
    this.tasksService
      .updateTasks(
        this.tasksForm.value.userId,
        this.tasksForm.value.externalId,
        this.tasksForm.value
      )
      .subscribe((data) => {
        this.getTasks();
        this.setViewMode();
      });
  }

  openModal() {
    this.modalOpen = true;
  }

  handleClose(shouldUpdate: boolean) {
    this.modalOpen = false;
    if (shouldUpdate) {
      this.updateTask();
    }
  }
}
