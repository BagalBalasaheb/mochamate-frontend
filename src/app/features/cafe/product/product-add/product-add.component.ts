import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  product!: FormGroup;
  categories: any = {};
  private _snackBar = inject(MatSnackBar);

  constructor(private $categoryService: CategoryService, private $productService: ProductService, private dialogRef: MatDialogRef<ProductAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.product = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
    });

    if (this.data) {
      this.product.patchValue({
        productName: this.data.name,
        productPrice: this.data.price,
        productCategory: this.data.categoryId,
        productDescription: this.data.description
      });
    }
    this.getCategory();
  }

  getCategory() {
    this.$categoryService.getCategory().subscribe(result => {
      this.categories = result;
    })
  }

  addProduct() {
    let formData = this.product.value;
    let data = {
      name: formData.productName,
      price: formData.productPrice,
      categoryId: formData.productCategory,
      description: formData.productDescription
    }
    this.$productService.addProduct(data).subscribe(result => {
      this.dialogRef.close('ADD');
      this._snackBar.open(result.message, 'ok');
    })
  }

  editProduct() {
    let formData = this.product.value;
    let data = {
      id: this.data.id,
      name: formData.productName,
      price: formData.productPrice,
      categoryId: formData.productCategory,
      description: formData.productDescription
    }
    this.$productService.updateProduct(data).subscribe(result => {
      this.dialogRef.close('EDIT');
      this._snackBar.open(result.message, 'ok');
    })
  }
}
