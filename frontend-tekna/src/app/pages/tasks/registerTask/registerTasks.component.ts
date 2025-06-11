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
  userToken?: string;
  listTasks: any;
  tasksForm!: FormGroup;
  modalOpen: boolean = false;
  modalMessage: string = '';
  modalBackButton: boolean = false;

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
      this.openModalDelete(data.message);
    });
  }

  openModalDelete(message: string) {
    this.modalMessage = message;
    this.modalOpen = true;
  }

  handleClose(shouldUpdate: boolean) {
    this.modalOpen = false;
    if (shouldUpdate) {
      this.goingBack();
    }
  }

  goingBack() {
    this.router.navigate(['tasks']);
  }
}
