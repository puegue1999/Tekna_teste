import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: any;

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
    }

    if (this.token && !req?.url.includes('auth')) {
        const modReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + this.token,
          },
        });

        return next.handle(modReq);
    }
    return next.handle(req);
  }
}
