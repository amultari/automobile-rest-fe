import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginEndpoint: string = 'http://localhost:8080/public/login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //questi mi servono per notificare agli altri component la presenza o meno dello user
  //poteva bastare solo la versione Observable ma sono presenti tutti e due in quanto
  //in alcuni punti (es. nell'auth.guard) potrebbe servire il valore corrente dello user
  //e l'observable non permette di farlo mentre il Subject si on il .value
  private userSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.loginEndpoint}`, user, { headers: this.headers })
      .subscribe((res: any) => {
        this.currentUser = res;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.userSubject.next(res);
        this.router.navigate(['']);
      });
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('user');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['log-in']);
  }

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
