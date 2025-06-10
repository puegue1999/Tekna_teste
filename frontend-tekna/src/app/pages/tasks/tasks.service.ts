import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks(user: any): Observable<any> {
    return this.http.get(`http://localhost:3000/tasks/${user}`);
  }

  registerTasks(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/tasks`, data);
  }
}
