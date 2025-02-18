import { Component } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardData: any = {}
  constructor(private $dashboardService: DashboardService) { }
  ngOnInit(){
    this.$dashboardService.getDetails().subscribe(result => {
      this.dashboardData = result;
    })
  }
}
