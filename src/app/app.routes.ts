import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/dashboard' } // gérer les routes non définies
];