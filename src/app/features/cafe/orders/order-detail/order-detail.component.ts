import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {

  bill: any = {};
  totalAmount = 0;
  constructor(private dialogRef: MatDialogRef<OrderDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.bill = this.data;
    
  }

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.bill.productDetails.reduce(
      (sum: any, product: any) => sum + product.quantity * product.price, 0
    );
  }

}
