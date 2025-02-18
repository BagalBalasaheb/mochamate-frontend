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
    this.bill = {
      "id": 12,
      "uuid": "d778c620-edfd-11ef-b976-ffd75e8881e9",
      "name": "f",
      "email": "f",
      "contactnumber": "f",
      "paymentMethod": "CC",
      "total": 680,  // Adjusted total amount for larger bill
      "productDetails": [
          {
              "id": 2,
              "name": "CocaA",
              "price": 20,
              "total": 100,  // Increased total price for CocaA
              "category": {
                  "id": 1,
                  "name": "Chill Drink.",
                  "description": "Best in the market"
              },
              "quantity": "5"  // Increased quantity
          },
          {
              "id": 3,
              "name": "Pepsi",
              "price": 20,
              "total": 120,  // Increased total price for Pepsi
              "category": {
                  "id": 2,
                  "name": "Drinks",
                  "description": "Best in the market"
              },
              "quantity": "6"  // Increased quantity
          },
          {
              "id": 4,
              "name": "Sprite",
              "price": 25,
              "total": 150,  // Added new product
              "category": {
                  "id": 3,
                  "name": "Soft Drinks",
                  "description": "Refreshing beverage"
              },
              "quantity": "6"
          },
          {
              "id": 5,
              "name": "Water Bottle",
              "price": 5,
              "total": 40,  // Added new product
              "category": {
                  "id": 4,
                  "name": "Beverages",
                  "description": "Pure and clean"
              },
              "quantity": "8"
          },
          {
              "id": 6,
              "name": "Juice",
              "price": 30,
              "total": 180,  // Added new product
              "category": {
                  "id": 5,
                  "name": "Fruit Drinks",
                  "description": "Natural and fresh"
              },
              "quantity": "6"
          }
      ],
      "createdBy": "ab@gmail.com"
    }
    
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
