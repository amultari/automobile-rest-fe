import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AutomobileService } from '../automobile/automobile.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private automobileService: AutomobileService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authService.userValue;
    const isLoggedInAndAccessToken = user && user.accessToken;
    const isApiUrl = request.url.startsWith(this.authService.loginEndpoint) ||
      request.url.startsWith(this.automobileService.apiServer);
    if (isLoggedInAndAccessToken && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
