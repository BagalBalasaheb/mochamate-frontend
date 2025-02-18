import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  // Sign-up function returning an observable
  signUp(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, credentials);
  }

  // Login function returning an observable
  logIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, credentials)
  }

  // Check if user is authenticated based on token presence and validity
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token ? !this.isTokenExpired(token) : false;
  }

  // Get user data from decoded JWT token
  getUserData(): any {
    const token = localStorage.getItem(this.tokenKey);
    return token ? jwtDecode(token) : null;
  }

  // Check if the JWT token has expired
  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return decoded?.exp * 1000 < Date.now();
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  // Global error handler
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status === 401) {
        errorMessage = 'Unauthorized access';
      } else if (error.status === 403) {
        errorMessage = 'Forbidden: You do not have permission';
      } else {
        errorMessage = `Server returned code ${error.status}`;
      }
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}

