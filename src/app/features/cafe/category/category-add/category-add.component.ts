import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../core/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-add',
  standalone: false,
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
  category!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private $categoryService: CategoryService, private dialogRef: MatDialogRef<CategoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.category = this.fb.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: ['', [Validators.required]]
    });

    if(this.data){
      this.category.patchValue({
        categoryName: this.data.name,  // Map `name` to `categoryName`
        categoryDescription: this.data.description  // Map `description` to `categoryDescription`
      });
    }
  }

  addCategory() {
    if (this.category.invalid) {
      return; // Prevent submission if form is invalid
    }

    const formValues = this.category.value;

    const categoryDetails = {
      name: formValues.categoryName,
      description: formValues.categoryDescription,
    };

    // Call the sign-up function from AuthService
    this.$categoryService.addCategory(categoryDetails).subscribe(
      (response) => {
        this.dialogRef.close('ADD');
        this._snackBar.open(response.message, 'ok');
      },
      (error) => {
      }
    );
  }

  editCategory() {
    if (this.category.invalid) {
      return; // Prevent submission if form is invalid
    }

    const formValues = this.category.value;

    const categoryDetails = {
      id: this.data.id,
      name: formValues.categoryName,
      description: formValues.categoryDescription,
    };

    // Call the sign-up function from AuthService
    this.$categoryService.updateCategory(categoryDetails).subscribe(
      (response) => {
        this.dialogRef.close('EDIT');
        this._snackBar.open(response.message, 'ok');
      },
      (error) => {
      }
    );
  }
}
