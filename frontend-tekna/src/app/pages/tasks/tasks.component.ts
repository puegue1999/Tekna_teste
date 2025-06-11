import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../tasks/tasks.service';
import { CommonModule } from '@angular/common';
import { Task } from './tasks';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule, LoadingComponent, FontAwesomeModule],
})
export class TasksComponent implements OnInit {
  faEye = faEye;
  faTrash = faTrash;
  userToken?: string;
  listTasks: Task[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.userToken = localStorage.getItem('user') ?? undefined;
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAllTasks(this.userToken).subscribe({
      next: (data) => {
        this.listTasks = (data.allTasks ?? []).map((task: Task) => ({
          externalId: task.externalId,
          title: task.title,
          description: task.description,
          expirationAt: new Date(task.expirationAt),
          finished: task.finished,
        }));
        this.isLoading = false;
        console.log(this.listTasks);
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas', err);
        this.isLoading = false;
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
