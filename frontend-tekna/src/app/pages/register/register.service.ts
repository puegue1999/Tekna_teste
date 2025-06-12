import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly apiUrl = 'http://localhost:3000/auth/register';

  constructor(private http: HttpClient) {}

  // Send registration data to the backend
  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
