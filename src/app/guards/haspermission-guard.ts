import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user/user.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HasPermissionGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isLoggedIn = this.userService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['login'], { queryParams: { redirectTo: state.url, redirectMessage: 'login/permission/login' } });
      return false;
    }

    const authorities = this.userService.getAuthorities();
    console.log(authorities);
    const needAuthorities = next.data.authorities as Array<string>;
    console.log(needAuthorities);
    console.log(next);
    let hasPermission = true;

    for (const needAuthority of needAuthorities) {
      if (!authorities.includes(needAuthority)) {
        this.router.navigate(['login'], { queryParams: { redirectTo: state.url, redirectMessage: 'login/permission/missing' } });
        hasPermission = false;
      }
    }
    return hasPermission;
  }
}
