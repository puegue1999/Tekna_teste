import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Routes } from '../../../envioronments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/register`, data);
  }
}