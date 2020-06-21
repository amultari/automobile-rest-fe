import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';

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
  currentUser$: Observable<User>;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser;

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.errorMessage = params['statusHttpMessage'] ? params['statusHttpMessage'] : '';
      });
  }

  loginUser(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.signIn(this.user);
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
    }
  }

}
