import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const getToken = this.tokenStorageService.getCookieToken();
    if (getToken && getToken != '' && getToken != null && getToken != undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${getToken}`,
        },
      });
    }

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.tokenStorageService.signOut()
        // this.router.navigate(['/login'])
      }

      const error = err.message
      return throwError(error);
    }));
  }
}
