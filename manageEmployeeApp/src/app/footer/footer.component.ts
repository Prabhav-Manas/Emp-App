import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appService/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
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
}
