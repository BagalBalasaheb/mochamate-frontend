import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        if (Date.now() < expirationTime) {
          return true;
        }
      } catch (error) {
        console.error('Error decoding JWT', error);
      }
    }
    this.router.navigate(['/']);  // Redirect to landing page if not authenticated or token expired
    return false;
  }
}
