import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing/landing.component';
import { HomePageComponent } from './features/cafe/homePage/home-page/home-page.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'cafe',
    component: HomePageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () => import('./features/cafe/cafe.module').then(m => m.CafeModule),
      }
    ],
    // Auth guard to protect the cafe routes
  },

  // Catch-all route for invalid paths
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
