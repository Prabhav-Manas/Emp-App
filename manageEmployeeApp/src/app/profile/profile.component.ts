import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../appService/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: any = FormGroup;
  editMode: boolean = false;

  userData = localStorage.getItem('UserData');
  parsedData: any;

  userProfileFormData: any;

  profileInfoData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      profileName: new FormControl('', Validators.required),
      profileUrl: new FormControl('', Validators.required),
    });

    // console.log(this.userData);

    if (this.userData !== null) {
      this.parsedData = JSON.parse(this.userData);
    }
    console.log('ParsedUserData=> ', this.parsedData._token);
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((res) => {
      let qParams = res.get('EditMode');
      if (qParams != null) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });

    this._authService.profileInfoData.subscribe((res) => {
      this.profileInfoData = res;

      this.profileForm.setvalue({
        profileName: res.displayName,
        profileUrl: res.photoUrl,
      });
    });
  }

  onSaveProfileForm() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }

    this.userProfileFormData = {
      token: this.parsedData._token,
      ...this.profileForm.value,
    };

    this._authService.updateProfile(this.userProfileFormData).subscribe(
      (res: any) => {
        console.log(res);
        this._authService.getProfileData(this.parsedData._token);
      },
      (errRes: any) => {
        console.log(errRes);
      }
    );
    this.profileForm.reset();
  }

  onDiscardEditProfile() {
    this.router.navigate([], { queryParams: { EditMode: null } });
  }
}
