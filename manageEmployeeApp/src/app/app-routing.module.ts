import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesDashboardComponent } from './employees-dashboard/employees-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth/auth.guard';
import { logInGuard } from './auth/log-in.guard';

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [logInGuard] },
  {
    path: 'employees-dashboard',
    component: EmployeesDashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'employee-details/:empId', component: EmployeeDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [logInGuard],
  },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
