import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  /** Fetch paginated & filtered task list */
  getAllTasks(
    user: string | undefined,
    page: number,
    orderBy: string,
    orderDirection: string,
    status: string,
    search: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${user}/${page}/${orderBy}/${orderDirection}/${status}/${search}`;
    return this.http.get(url);
  }

  /** Fetch a single task by userId & externalId */
  getTask(userId: string, externalId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/${externalId}`);
  }

  /** Create a new task */
  createTask(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  /** Update an existing task */
  updateTask(userId: string, externalId: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}/${externalId}`, data);
  }

  /** Delete a task by externalId */
  deleteTask(externalId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${externalId}`);
  }
}
