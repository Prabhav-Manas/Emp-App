import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any;

  constructor(private _authService: AuthService) {
    this._authService.profileInfoData.subscribe((res) => {
      this.user = res;
    });
  }

  ngOnInit() {
    this._authService.user.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      // this.isLoggedIn = !res ? false : true;
      // this.isLoggedIn = !!res;
    });
  }

  logout() {
    this._authService.signOut();
  }
}
