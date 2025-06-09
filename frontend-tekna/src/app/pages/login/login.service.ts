import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/login`, data);
  }

  teste(): Observable<any> {
    return this.http.get(`http://localhost:3000/tasks/1`);
  }
}
