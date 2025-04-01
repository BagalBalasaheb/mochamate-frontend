import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // If the error is due to an unauthorized request (401), redirect to login
        if (error.status === 401) {
          localStorage.removeItem('authToken');  // Remove the invalid/expired token
          this.router.navigate(['/']);  // Redirect to the landing page or login page
        }
        return throwError(error);
      })
    );

    // return next.handle(req).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 401) {
    //       // Handle unauthorized (expired or invalid token)
    //       localStorage.removeItem('authToken');
    //       this.router.navigate(['/']);  // Redirect to login or landing page
    //     } else if (error.status === 403) {
    //       // Handle forbidden (lack of permissions)
    //       // Optionally log the user out or redirect to a forbidden page
    //       this.router.navigate(['/forbidden']);  // Redirect to a custom "Forbidden" page
    //     }

    //     return throwError(error);  // Continue throwing the error
    //   })
    // );
    
  }
}
