import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mochamate-frontend';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        if (Date.now() > expirationTime) {
          localStorage.removeItem('authToken');
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/cafe/dashboard']);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
