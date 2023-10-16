import { Component } from '@angular/core';
import { AuthService } from './appService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'manageEmployeeApp';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.autoSignIn();
  }
}
