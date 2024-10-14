import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../appService/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any = FormGroup;
  success: boolean = false;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  onResetPassword() {
    if (this.forgotPasswordForm.valid) {
      // console.log(this.forgotPasswordForm.value);
      // this._authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      //   (res) => {
      //     console.log(res);
      //     this.success = true;
      //   },
      //   (errRes) => {
      //     console.log(errRes);
      //   }
      // );
    }
    this.forgotPasswordForm.reset();
  }
}
