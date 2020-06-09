import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.signIn(this.user);
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
