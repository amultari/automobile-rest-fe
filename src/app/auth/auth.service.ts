import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginEndpoint: string = 'http://localhost:8080/public/login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, private router: Router) {
  }

  //questo campo mi serve per tenere aggiornati navbar e footer, per farli apparire o meno
  private loggedInSub = new BehaviorSubject<boolean>(false);

  get isLoggedInSub(): Observable<boolean> {
    this.loggedInSub.next(this.isLoggedIn);
    return this.loggedInSub.asObservable();
  }

  // Sign-up
  // signUp(user: User): Observable<any> {
  //   let api = `${this.endpoint}/register-user`;
  //   return this.http.post(api, user)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.loginEndpoint}`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        this.currentUser = res;
        this.loggedInSub.next(this.isLoggedIn);
        this.router.navigate(['']);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    this.loggedInSub.next(this.isLoggedIn);
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // // User profile
  // getUserProfile(id): Observable<any> {
  //   let api = `${this.loginEndpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
