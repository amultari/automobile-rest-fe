import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.userValue;
      if (user) {
          // check if route is restricted by role
          if (route.data.roles && !user.roles.some((val) => route.data.roles.indexOf(val) !== -1)) {
              // role not authorised so redirect to home page
              this.router.navigate(['/'], { queryParams: { notAuthMessage: 'Operazione non consentita con il profilo corrente.' } });
              return false;
          }

          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;

  }

}
