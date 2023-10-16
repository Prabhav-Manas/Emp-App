import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../appService/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../appInterface/auth-response.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: any = FormGroup;
  logInMode: boolean = true;
  // empty_con_pass: boolean = false;
  // unmatched_con_pass: boolean = false;
  // btn_dis: boolean = true;
  isLoading: boolean = false;
  error: any;

  hide = 'password';
  // errMsg = this._errorService.errorMessages;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router // private socialAuthService: SocialAuthService
  ) {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // confirmPassword: new FormControl('', [Validators.required]),
      // phone: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  onModeSwitch() {
    this.logInMode = !this.logInMode;
  }

  onSubmitAuthForm() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);

      const email = this.authForm.value.email;
      const password = this.authForm.value.password;

      let authObservable: Observable<AuthResponse>;

      if (this.logInMode) {
        // SignIn
        authObservable = this._authService.signIn(email, password);
      } else {
        // SignUp
        authObservable = this._authService.signUp(email, password);
      }
      authObservable.subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['employees-dashboard']);
        },
        (errRes: any) => {
          console.log(errRes);
          this.error = errRes.error.error.message;
          // this.error = this.errMsg[errRes.error.error.message];
        }
      );
    } else {
      // ...
    }
    this.authForm.reset();
  }

  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  onGoogleSignIn() {}
}
