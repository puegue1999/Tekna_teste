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

@Component({
  selector: 'app-registerTasks',
  templateUrl: './registerTasks.component.html',
  styleUrls: ['./registerTasks.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterTasksComponent implements OnInit {
  userToken?: string;
  listTasks: any;
  tasksForm!: FormGroup;

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
      externalId: [localStorage.getItem('user'), [Validators.required]],
    });
  }

  registerTask() {
    this.tasksService.registerTasks(this.tasksForm.value).subscribe((data) => {
      this.goingBack();
    });
  }

  goingBack() {
    this.router.navigate(['tasks']);
  }
}
