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
    //let getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJlbWFpbCI6ImFiY2RlZkBnbWFpbC5jb20iLCJqdGkiOiJiNGI3ODk2MC05MTY4LTQ5ZjctYjhkYS1lNmZhMzJjNjRjNDMiLCJVc2VySWQiOiIyNzMiLCJVc2VyRnVsbE5hbWUiOiJSb3V0ZSBUZXN0IiwiVXNlckVtYWlsSWQiOiJhYmNkZWZAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NjE3NTEzMDY4IiwiRGVzaWduYWlvbklkIjoiMjE2IiwiRGVzaWduYWlvbk5hbWUiOiJTci4gRXhlY3V0aXZlIiwiRGVwYXJ0bWVudElkIjoiMCIsIkRlcGFydG1lbnROYW1lIjoiIiwiT3JnYW5pemF0aW9uSWQiOiIxIiwiT3JnYW5pemF0aW9uTmFtZSI6IkdpZ2F0ZWwiLCJDb21wYW55SWQiOiIzIiwiQ29tcGFueU5hbWUiOiJHaWdhdGVsIFNvbHV0aW9ucyBQcml2YXRlIExpbWl0ZWQiLCJTZWxlY3RlZENvbXBhbnlJZCI6IjMiLCJTZWxlY3RlZENvbXBhbnlOYW1lIjoiR2lnYXRlbCBTb2x1dGlvbnMgUHJpdmF0ZSBMaW1pdGVkIiwiRW1wbG95ZWVJZCI6Ijk5MiIsIlNoaWZ0VGltZSI6IjA5OjMwLTE4OjMwIiwiU2hpZnRJZCI6IjI3IiwiQXBwVHlwZSI6IldFQiIsIlJvbGUiOiIiLCJleHAiOjE3NTkzODk5MTUsImlzcyI6IlRlc3QuY29tIiwiYXVkIjoiVGVzdC5jb20ifQ.-s92sjwqfcCDo1cHwyv-XpIbdV5W5JmD0t8OJhfF1mY'
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
