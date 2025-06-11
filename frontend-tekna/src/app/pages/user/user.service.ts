import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(user: any): Observable<any> {
    return this.http.get(`http://localhost:3000/${user}`);
  }

  updateUser(user: any, data: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/${user}`, data);
  }
}
