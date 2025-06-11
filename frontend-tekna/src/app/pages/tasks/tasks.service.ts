import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks(
    user: any,
    page: any,
    orderBy: any,
    orderDirection: any,
    finished: any,
    search: any
  ): Observable<any> {
    return this.http.get(
      `http://localhost:3000/tasks/${user}/${page}/${orderBy}/${orderDirection}/${finished}/${search}`
    );
  }

  getTasks(userId: any, externalId: any): Observable<any> {
    return this.http.get(`http://localhost:3000/tasks/${userId}/${externalId}`);
  }

  registerTasks(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/tasks`, data);
  }

  updateTasks(userId: any, externalId: any, data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:3000/tasks/${userId}/${externalId}`,
      data
    );
  }

  deleteTasks(externalId: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/tasks/${externalId}`);
  }
}
