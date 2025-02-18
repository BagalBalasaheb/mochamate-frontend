import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  category: any = {};
  displayedColumns = ['No', 'Product', 'Category', 'Description', 'Price', 'Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); 

  private _snackBar = inject(MatSnackBar);

  constructor(private dialog: MatDialog, private $productService: ProductService) {
  }

  ngOnInit() {
    this.$productService.getProduct().subscribe(result => {
      this.dataSource.data  = result;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'ADD'){
        this.$productService.getProduct().subscribe(result => {
          this.dataSource.data  = result;
        })
      }
    });
  }

  onEditProduct(product: any) {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      data: product,
      hasBackdrop: true,
      disableClose: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'EDIT') {
        this.$productService.getProduct().subscribe(result => {
          this.dataSource.data  = result;
        })
      }
    });
  }

  onDeleteProduct(product: any) {
    this.$productService.deleteProduct(product.id).subscribe(result => {
      this.$productService.getProduct().subscribe(result => {
        this.dataSource.data  = result;
      })
      this._snackBar.open(result.message, 'ok');
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
