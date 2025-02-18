import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  getCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/getCategory`);
  }

  addCategory(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/category/addCategory`, credentials);
  }

  updateCategory(credentials: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/category/updateCategory`, credentials);
  }

}
