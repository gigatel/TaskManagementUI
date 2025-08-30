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
    //let getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJlbWFpbCI6InRlY2hob3VzZXByaXZhdGVAZ21haWwuY29tIiwianRpIjoiNjdlMzExNjQtZDE4NS00Y2I2LTkwOGItOTdmZmQyNjdiYTY4IiwiVXNlcklkIjoiMzA5IiwiVXNlckZ1bGxOYW1lIjoiUm9oaXQgQ2hhdWhhbiIsIlVzZXJFbWFpbElkIjoidGVjaGhvdXNlcHJpdmF0ZUBnbWFpbC5jb20iLCJQaG9uZU51bWJlciI6Ijk1NDAwNzI3NzEiLCJEZXNpZ25haW9uSWQiOiIzMjMiLCJEZXNpZ25haW9uTmFtZSI6IkZyb250ZW5kIERldmVsb3BlciIsIkRlcGFydG1lbnRJZCI6IjAiLCJEZXBhcnRtZW50TmFtZSI6IiIsIk9yZ2FuaXphdGlvbklkIjoiMSIsIk9yZ2FuaXphdGlvbk5hbWUiOiJHaWdhdGVsIiwiQ29tcGFueUlkIjoiMTYiLCJDb21wYW55TmFtZSI6IkdpZ2F0ZWwgVGVjaG9ub3NvZnQgUHJpdmF0ZSBMaW1pdGVkIiwiU2VsZWN0ZWRDb21wYW55SWQiOiIzIiwiU2VsZWN0ZWRDb21wYW55TmFtZSI6IkdpZ2F0ZWwgU29sdXRpb25zIFByaXZhdGUgTGltaXRlZCIsIkVtcGxveWVlSWQiOiIxMDI5IiwiU2hpZnRUaW1lIjoiMDk6MzAtMTg6MzAiLCJTaGlmdElkIjoiNTMiLCJBcHBUeXBlIjoiV0VCIiwiUm9sZSI6IiIsImV4cCI6MTc1NjUzMjI2MCwiaXNzIjoiVGVzdC5jb20iLCJhdWQiOiJUZXN0LmNvbSJ9.86aXO0jwhAoMQnNiS2sbh43NRqaohuUdDFPvGsekGs8'
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
