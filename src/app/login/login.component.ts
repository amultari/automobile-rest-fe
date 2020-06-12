import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../auth/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  user: User = new User();

  //questo campo mi serve per gestire la comparsa/scomparsa dei componenti nel caso sia già
  //loggato e tenti di accedere alla pagina di login
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedInSub;
  }

  loginUser(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.signIn(this.user);
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
    }
  }

}
