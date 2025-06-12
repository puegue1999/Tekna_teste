import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Send login request to API
  login(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/login`, data);
  }
}
