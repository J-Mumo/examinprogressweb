import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TOKEN_NAME } from '../auth/auth-constants';
import { User } from './user-request';
import { UserTransfer } from './user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  GET_USER_TRANSFERS_URL = '/spotadev/admin/users';
  GET_NON_ADMIN_USERS = '/spotadev/admin/users/nonadminusers';
  accessToken: string;
  loggedInUserId: number;
  authorities: string[];
  loggedInEmail: string;
  dashboardUrls: string[] = [];
  dashboardTitles: string[] = [];

  constructor(
    private http: HttpClient, private route: ActivatedRoute,
    private jwtHelperService: JwtHelperService) {

  }

  login(accessToken: string): void {
    const decodedToken = this.jwtHelperService.decodeToken(accessToken);
    this.authorities = decodedToken.authorities;
    this.loggedInEmail = decodedToken.user_name;

    if (this.authorities !== undefined) {
      for (const authority of decodedToken.authorities) {
      }
    }

    this.accessToken = accessToken;
    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  isLoggedIn(): boolean {
    if (this.loggedInEmail) {
      return true;
    }
    return false;
  }

  getAuthorities(): string[] {
    return this.authorities;
  }

  getUserDashboardByRole(): void {
    const roles: string[] = this.getAuthorities();
    this.dashboardUrls = [];
    this.dashboardTitles = [];

    if (roles !== undefined) {
      if (roles.indexOf('SuperAdmin') > -1) {
        this.dashboardUrls.push('/superadmin/dashboard');
        this.dashboardTitles.push('header/topheader/superadmin_dashboard');
      } else if (roles.indexOf('Teacher') > -1) {
        this.dashboardUrls.push('/teacher/dashboard');
        this.dashboardTitles.push('header/topheader/member_dashboard');
      }
    }
  }

  getAccessToken(): string {
    return 'Bearer ' + localStorage.getItem('access_token');
  }

  getAccessTokenForImage(): string {
    return 'bearer=' + localStorage.getItem('access_token');
  }

  hasPermission(permission: string): boolean {
    return this.authorities.some(el => el === permission);
  }

  getUserTransfers(): Observable<UserTransfer[]> {
    return this.http.get(this.GET_USER_TRANSFERS_URL).pipe(map(
      (response: UserTransfer[]) => {
        return response;
      }
    ));
  }

  getNonAdminUsers(): Observable<User[]> {
    return this.http.get(this.GET_NON_ADMIN_USERS).pipe(map(
      (response: User[]) => {
        return response;
      }
    ));
  }
}
