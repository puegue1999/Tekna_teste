import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /** Retrieve user by ID */
  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  /** Update user data */
  updateUser(userId: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, data);
  }
}
