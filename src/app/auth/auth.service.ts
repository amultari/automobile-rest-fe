import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  loginEndpoint: string = 'http://localhost:8080/public/login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient,private router: Router) {
  }

  private loggedInObs = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedInObs() {
    this.loggedInObs.next(this.isLoggedIn);
    return this.loggedInObs.asObservable();
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
    // return this.http.post<any>(`${this.loginEndpoint}`, user)
    //   .subscribe((res: any) => {
    //     localStorage.setItem('access_token', res.token);
    //     this.loggedInObs.next(this.isLoggedIn);
    //     // this.getUserProfile(res._id).subscribe((res) => {
    //     //   this.currentUser = res;
    //     //   this.router.navigate(['user-profile/' + res.msg._id]);
    //     // })
    //   });
      localStorage.setItem('access_token','sdfsdfadfadf');
      this.loggedInObs.next(this.isLoggedIn);
      this.router.navigate(['' ]);
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
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
    this.loggedInObs.next(this.isLoggedIn);
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
