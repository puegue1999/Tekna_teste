import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../tasks/tasks.service';
import { CommonModule } from '@angular/common';
import { Task } from './tasks';
import { LoadingComponent } from '../../services/loading/loading.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
})
export class TasksComponent implements OnInit {
  userToken?: string;
  listTasks: Task[] = [];
  tasksForm!: FormGroup;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userToken = localStorage.getItem('user') ?? undefined;
    this.getAllTasks();
  }

  getAllTasks() {
    this.isLoading = true;
    this.tasksService.getAllTasks(this.userToken).subscribe((data) => {
      this.listTasks = data.allTasks;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  toRegisterTasks() {
    this.router.navigate(['tasks/new']);
  }
}
