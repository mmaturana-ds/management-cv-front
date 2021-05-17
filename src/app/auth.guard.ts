import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn.pipe(map((isLoggedIn: boolean) => {
      const token = this.authService.getToken();

      if(isLoggedIn === false) {
        if(token && token.length > 0) {
          this.authService.validate().then(result => {
            if(result) {
              this.authService.setLoggedIn();
              return true;
  
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          }).catch(() => {
            this.router.navigate(['/login']);
            return false;
          });

        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
    }));  
  }
}
