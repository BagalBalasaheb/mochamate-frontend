import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { BillService } from '../../../../core/services/bill.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  displayedColumns = ['No', 'Name', 'Category', 'Price', 'Quantity', 'Total', 'Delete'];

  customerDetails!: FormGroup;
  categories: any = [];
  products: any = [];
  price: any = 0;
  totalAmount: any = 0;
  dataSource: any = []

  count = 1546
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private $billService: BillService, private $categoryService: CategoryService, private $productService: ProductService) {
  }
  ngOnInit() {
    this.customerDetails = this.fb.group({
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      customerNumber: [null, [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      product: ['', [Validators.required]],
      productcategory: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productQuantitiy: ['', [Validators.required]],
      total: [0, [Validators.required]],
    });

    this.getCategorys();
  }

  getCategorys() {
    this.$categoryService.getCategory().subscribe(result => {
      this.categories = result;
    })
  }

  getProductByCategory(data: any) {
    this.$productService.getProductByCategoryId(data.id).subscribe(result => {
      this.products = result;
      this.customerDetails.controls['productPrice'].setValue('');
      this.customerDetails.controls['productQuantitiy'].setValue('');
      this.customerDetails.controls['total'].setValue(0);
    })
  }

  getProductDetails(data: any) {
    this.$productService.getProductById(data.id).subscribe(result => {
      this.price = result.price;
      this.customerDetails.controls['productPrice'].setValue(result.price);
      this.customerDetails.controls['productQuantitiy'].setValue('1');
      this.customerDetails.controls['total'].setValue(this.price * 1);
    })
  }

  setQuantity(data: any) {
    let temp = this.customerDetails.controls['productQuantitiy'].value;
    if (temp > 0) {
      this.customerDetails.controls['total'].setValue(this.customerDetails.controls['productQuantitiy'].value * this.customerDetails.controls['productPrice'].value);
    } else if (temp != '') {
      this.customerDetails.controls['productQuantitiy'].setValue('1');
      this.customerDetails.controls['total'].setValue(this.customerDetails.controls['productQuantitiy'].value * this.customerDetails.controls['productPrice'].value);
    } else {
      this.customerDetails.controls['total'].setValue(0)
    }
  }

  validateAddButton() {
    if (this.customerDetails.controls['total'].value === 0 || this.customerDetails.controls['total'].value === null || this.customerDetails.controls['productQuantitiy'].value <= 0) return true;
    return false;
  }

  validateSubmit() {
    if (this.totalAmount === 0 || this.customerDetails.controls['customerName'].value ==='' || this.customerDetails.controls['customerEmail'].value ==='' || this.customerDetails.controls['customerNumber'].value === null || this.customerDetails.controls['paymentMethod'].value === '') return true;

    return false
  }

  add() {
    let formData = this.customerDetails.value;
    let productName = this.dataSource.find((e: { id: number }) => e.id == formData.product.id);

    if (productName === undefined) {
      this.totalAmount += formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.productcategory,
        price: formData.productPrice,
        quantity: formData.productQuantitiy,
        total: formData.total,
      });
      this.dataSource = [...this.dataSource];
      this._snackBar.open("Product Added To Bill", 'ok');
    };

    this.customerDetails.controls['productQuantitiy'].setValue(0);
    this.customerDetails.controls['productPrice'].setValue(0);
    this.customerDetails.controls['total'].setValue(0);
    this.customerDetails.controls['product'].setValue('');
    this.customerDetails.controls['productcategory'].setValue('');

    this.customerDetails.controls['product'].markAsUntouched();
    this.customerDetails.controls['productQuantitiy'].markAsUntouched();
    this.customerDetails.controls['productPrice'].markAsUntouched();
    this.customerDetails.controls['total'].markAsUntouched();
    this.customerDetails.controls['productcategory'].markAsUntouched();
  }

  handleDelete(data: any, element: any) {
    this.totalAmount -= element.total;
    this.dataSource.splice(data, 1);
    this.dataSource = [...this.dataSource];
  }

  submit() {
    let formData = this.customerDetails.value;
    let data = {
      name: formData.customerName,
      email: formData.customerEmail,
      contactNumber: formData.customerNumber,
      paymentMethod: formData.paymentMethod,
      total: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource)
    };

    this.$billService.generateReport(data).subscribe((result: any) => {
      this.downloadPdf(result.uuid);
      this.customerDetails.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    })
  }

  downloadPdf(uuid: any) {
    let data = {
      uuid: uuid
    }
    this.$billService.generatePdf(data).subscribe((result: any) => {
      saveAs(result, uuid + '.pdf');
    })
  }
}
