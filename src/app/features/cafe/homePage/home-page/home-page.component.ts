import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  sidebarDetails = [{ 'name': 'Dashboard', 'icon': 'dashboard', 'routeLink': 'dashboard' },
  { 'name': 'Manage Category', 'icon': 'category', 'routeLink': 'category' },
  { 'name': 'Manage Products', 'icon': 'inventory_2', 'routeLink': 'product' },
  { 'name': 'Orders', 'icon': 'shopping_bag', 'routeLink': 'orders' },
  { 'name': 'View Bills', 'icon': 'receipt_long', 'routeLink': 'bills' },
  // { 'name': 'Cafe Analytics', 'icon': 'monitoring', 'routeLink': 'analytics' }
  ];

  constructor(private $authService: AuthService) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  logOut(){
    this.$authService.logOut();
  }
}
