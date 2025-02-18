import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 login!: FormGroup;
   private _snackBar = inject(MatSnackBar);
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private $authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private route: Router) {
  }

  ngOnInit() {
    this.login = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  logIn() {
    if (this.login.invalid) {
      return; // Prevent submission if form is invalid
    }

    const formValues = this.login.value;

    const userCredentials = {
      email: formValues.email,
      password: formValues.password,
    };

    // Call the sign-up function from AuthService
    this.$authService.logIn(userCredentials).subscribe(
      (response) => {
        this.dialogRef.close();
        localStorage.setItem('authToken', response.token);
        this.route.navigate(['/cafe']);
        this._snackBar.open(response.message, 'ok');
      },
      (error) => {
        console.error('logIn failed:', error);
      }
    );
  }
}
