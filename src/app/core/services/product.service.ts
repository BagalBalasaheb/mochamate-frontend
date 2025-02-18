import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  getProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/getProduct`);
  }

  addProduct(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/addProduct`, credentials);
  }

  updateProduct(credentials: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/product/updateProduct`, credentials);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/deleteByProductId/` + id);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/getByProductId/` + id);
  }

  getProductByCategoryId(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/getByCategoryId/` + id);
  }
}
