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

  userData = localStorage.getItem('UserData');
  parsedData: any;
  confirmPasswordFormData: any;

  success: boolean = false;
  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.changePasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
    });

    if (this.userData !== null) {
      this.parsedData = JSON.parse(this.userData);
    }
    console.log('ParsedUserData=> ', this.parsedData._token);
  }

  ngOnInit() {}

  onSubmitChangePasswordFormData() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value.password);

      this.confirmPasswordFormData = {
        token: this.parsedData._token,
        ...this.changePasswordForm.value,
      };
      console.log('confirmPasswordFormData:=> ', this.confirmPasswordFormData);

      this._authService.changePassword(this.confirmPasswordFormData).subscribe(
        (res) => {
          console.log(res);
          this.success = true;
        },
        (errRes) => {
          console.log(errRes);
        }
      );
    }
  }
}
