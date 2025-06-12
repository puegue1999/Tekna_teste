import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { RegisterTasksComponent } from './pages/tasks/registerTask/registerTasks.component';
import { UserComponent } from './pages/user/user.component';
import { ViewTasksComponent } from './pages/tasks/viewTask/viewTasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        component: TasksComponent,
      },
      {
        path: 'new',
        component: RegisterTasksComponent,
      },
      {
        path: 'view/:externalId',
        component: ViewTasksComponent,
      },
    ],
  },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: 'login' }
];
