import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user/user.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isLoggedIn = this.userService.isLoggedIn();

    if (!isLoggedIn) {
      // this.router.navigate(['login'], { queryParams: { redirectTo: state.url, redirectMessage: 'login/permission/missing' } });
      return false;
    }
    return true;
  }
}
