import { Injectable, Injector, PLATFORM_ID, Inject } from '@angular/core';
import { 
  HttpErrorResponse, 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();

    if (token && !req.url.includes('auth')) {
      const modReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });

      return next.handle(modReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            authService.logout();
          }
          return throwError(() => error);
        })
      );
    }
    
    return next.handle(req);
  }
}