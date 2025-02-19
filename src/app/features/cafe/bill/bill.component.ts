import { Component, inject } from '@angular/core';
import { BillService } from '../../../core/services/bill.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailComponent } from '../orders/order-detail/order-detail.component';
import { saveAs } from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bill',
  standalone: false,
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss'
})
export class BillComponent {
  displayedColumns = ['No', 'Name', 'Email', 'Contact Number', 'Payment Method', 'Total', 'Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); 



  private _snackBar = inject(MatSnackBar);

  constructor(private $billService: BillService, private $categoryService: CategoryService, private $productService: ProductService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.table()
  }

  table() {
    this.$billService.getBill().subscribe(result => {
      this.dataSource.data = result;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewBill(element: any) {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      data: element,
      hasBackdrop: true,
      disableClose: true,
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  downloadAction(values: any) {
    let data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactnumber,
      paymentMethod: values.paymentMethod,
      total: values.total,
      productDetails: JSON.stringify(values.productDetails)
    }

    this.$billService.generatePdf(data).subscribe((result: any) => {
      saveAs(result, values.uuid + '.pdf');
      this._snackBar.open("Bill Downloaded Successfully", 'ok');
    })
  }

  deleteAction(data: any) {
    this.deleteBillId(data.id)
  }

  deleteBillId(id: any) {
    this.$billService.deleteBill(id).subscribe((result: any) => {
      this.table();
      this._snackBar.open(result.message, 'ok');
    })
  }
}
