import { Component, inject, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signIn!: FormGroup;
  private _snackBar = inject(MatSnackBar);
  constructor(private $authService: AuthService, private dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private route: Router) {
  }

  ngOnInit() {
    this.signIn = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
    });
  }

  passwordMatchValidator(control: any): { [key: string]: boolean } | null {
    if (this.signIn && control.value !== this.signIn.get('password')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signIn.invalid) {
      return; // Prevent submission if form is invalid
    }

    const formValues = this.signIn.value;

    const userCredentials = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      contactNumber: formValues.contactNumber,
    };

    // Call the sign-up function from AuthService
    this.$authService.signUp(userCredentials).subscribe(
      (response) => {
        this.dialogRef.close();
        this._snackBar.open(response.message, 'ok');
      },
      (error) => {
        console.error('Signup failed:', error);
      }
    );
  }

}
