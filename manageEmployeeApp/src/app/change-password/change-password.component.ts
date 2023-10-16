import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../appService/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any = FormGroup;
  confirmPasswordFormData: any;
  success: boolean = false;
  userData: any;
  parsedData: any;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.changePasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
    });

    this.userData = localStorage.getItem('UserData');

    if (this.userData !== null) {
      this.parsedData = JSON.parse(this.userData);
    }
    console.log('ParsedUserData=> ', this.parsedData._token);
  }

  ngOnInit() {
    // this.onSubmitChangePasswordFormData();
  }

  onSubmitChangePasswordFormData() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value.password);

      this.confirmPasswordFormData = {
        token: this.parsedData._token,
        ...this.changePasswordForm.value,
      };
      console.log('confirmPasswordFormData:=> ', this.confirmPasswordFormData);

      // this._authService.changePassword(this.confirmPasswordFormData).subscribe(
      //   (res) => {
      //     console.log(res);
      //     this.success = true;
      //   },
      //   (errRes) => {
      //     console.log(errRes);
      //   }
      // );

      this._authService.changePassword(this.confirmPasswordFormData).subscribe(
        (res: any) => {
          console.log(res);
          // this._authService.getProfileData(this.parsedData._token);
        },
        (errRes: any) => {
          console.log(errRes);
        }
      );
    }
  }
}
