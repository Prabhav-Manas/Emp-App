import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { EmployeesDashboardComponent } from './employees-dashboard/employees-dashboard.component';

import { EmployeeService } from './appService/employee.service';
import { EmpBoardPipe } from './appPipes/emp-board.pipe';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/authInterceptor/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesDashboardComponent,
    EmployeeDetailsComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    EmpBoardPipe,
    ProfileComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
