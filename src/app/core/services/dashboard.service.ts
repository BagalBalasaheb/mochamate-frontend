import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  getDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/details`);
  }

}
