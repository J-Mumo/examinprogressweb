import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  TOKEN_AUTH_PASSWORD,
  TOKEN_AUTH_USERNAME
} from './auth-constants';
import { ParentService } from '../../parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static AUTH_TOKEN_URL = '/oauth/token';

  constructor(
    private http: HttpClient,
    private parentService: ParentService) {
  }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
      })
    };

    const body =
      `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}` +
      `&grant_type=password`;

    return this.http.post(AuthenticationService.AUTH_TOKEN_URL, body, httpOptions)
      .pipe(map((res: any) => {
        if (res.access_token) {
          this.parentService.hidePublicHeader = true;
          this.parentService.hidePrivateHeader = false;
          this.parentService.showNavBar = true;
          return res.access_token;
        }
        return null;
      }));
  }
}
