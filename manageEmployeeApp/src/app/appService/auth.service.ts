import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../appModel/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  profileInfoData = new BehaviorSubject({
    displayName: '',
    email: '',
    photoUrl: '',
  });

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // SignUp
  signUp(email: any, password: any) {
    return this.http
      .post<AuthResponse>('http://localhost:9000/api/users/signup', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((res: any) => {
          this.authenticatedUser(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  signIn(email: any, password: any) {
    return this.http
      .post<any>('http://localhost:9000/api/users/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.authenticatedUser(res.userId, email, res.token, 3600); // Assuming you want to set expiration to 1 hour.
        })
      );
  }

  autoSignIn() {
    const userData = localStorage.getItem('UserData');
    if (userData !== null) {
      const parsedData = JSON.parse(userData);
      console.log('ParsedData=> ', parsedData);
      const loggedInUser = new User(
        parsedData.email,
        parsedData.id,
        parsedData._token,
        new Date(parsedData._tokenExpirationDate)
      );
      if (loggedInUser.token) {
        this.user.next(loggedInUser);

        const expirationDuration =
          new Date(parsedData._tokenExpirationDate).getTime() -
          new Date().getTime();

        this.autoSignOut(expirationDuration);
        // this.getProfileData(loggedInUser.token);
      }
    }
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('UserData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  // Handle error improvements
  private handleError(errRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errRes.error && errRes.error.message) {
      errorMessage = errRes.error.message; // Adjust according to your backend error structure
    }
    return throwError(errorMessage);
  }

  private authenticatedUser(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoSignOut(expiresIn * 1000);
    localStorage.setItem('UserData', JSON.stringify(user)); // Store in localStorage if needed
  }

  // updateProfile(data: any) {
  //   return this.http
  //     .post<any>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg',
  //       {
  //         idToken: data.token,
  //         displayName: data.profileName,
  //         photoUrl: data.profileUrl,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  // getProfileData(token: any) {
  //   this.http
  //     .post<any>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg',
  //       {
  //         idToken: token,
  //       }
  //     )
  //     .subscribe((res) => {
  //       this.profileInfoData.next({
  //         displayName: res.users[0].displayName,
  //         email: res.users[0].email,
  //         photoUrl: res.users[0].photoUrl,
  //       });
  //     });
  // }

  // changePassword(data: any) {
  //   return this.http
  //     .post<any>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg',
  //       {
  //         idToken: data.token,
  //         password: data.password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  // forgotPassword(data: any) {
  //   return this.http
  //     .post<any>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg',
  //       {
  //         requestType: 'PASSWORD_RESET',
  //         email: data.email,
  //       }
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  // googleSignIn(idToken: any) {
  //   return this.http.post<any>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg',
  //     {
  //       postBody: `id_token=${idToken}&providerId=google.com`,
  //       requestUri: 'http://localhost:4200',
  //       returnIdpCredential: true,
  //       returnSecureToken: true,
  //     }
  //   );
  // }
}

// signup:https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg
// signIn: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-P577EK1-NW-uS_k4BhlZhDZWnBMhPzg
