import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getBill(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bill/getBills`);
  }

  generateReport(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bill/generateBill`, data);
  }

  generatePdf(data: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/bill/getPdf`, data, { responseType: 'blob' });
  }

  deleteBill(id: any) {
    return this.http.delete(`${this.apiUrl}/bill/deleteBill/` + id);
  }
}
