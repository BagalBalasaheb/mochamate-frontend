import { Component } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../auth/sign-in/sign-in.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private dialog: MatDialog, private authService : AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/cafe/dashboard']);
    }
  }

  openDialogLogIn(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: { hello: "Heyyy!" },
      hasBackdrop: true,
      disableClose: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogSignUp(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
