import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user/user.service';
import { ConfigService } from '../services/config/config.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PrivateAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private configService: ConfigService) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return true;
    // return this.configService.canActivateForPrivateAuthGuard(state, this.router);
  }
}
