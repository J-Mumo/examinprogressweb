import { Injectable } from '@angular/core';
import { ConfigInitialData } from './config-request-response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  GET_USERS_INITIAL_DATA_URL = '/examinprogress/config/getinitialdata';

  public debug = false;
  public privateMode: boolean;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  getConfigInitialData(): Observable<ConfigInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };


    return this.http.post(
      this.GET_USERS_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: ConfigInitialData) => {
          this.privateMode = response.privateMode;
          return response;
        }
      ));
  }

  private loginIfNecessary(state: RouterStateSnapshot, router: Router) {

    console.log('Inside loginIfNecessary(..)');

    const isLoggedIn = this.userService.isLoggedIn();
    console.log('isLoggedIn = ' + isLoggedIn);

    if (!isLoggedIn) {
      console.log('forwarding to login');
      router.navigate(
        ['login'],
        {
          queryParams: {
            redirectTo: state.url
          }
        }
      );

      console.log('return false from loginIfNecessary(..)');
      return false;
    }
    console.log('return true from loginIfNecessary(..)');
    return true;
  }

  canActivateForPrivateAuthGuard(state: RouterStateSnapshot, router: Router): any {
    if (this.privateMode === undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

      return this.http.post(
        this.GET_USERS_INITIAL_DATA_URL, httpOptions).pipe(map(
          (response: ConfigInitialData) => {
            this.privateMode = response.privateMode;

            if (this.privateMode) {
              const activate: boolean = this.loginIfNecessary(state, router);
              console.log('About to return ' + activate + ' from canActivate(..)');
              return activate;
            }

            return true;
          }
        ));
    } else {
      if (this.privateMode) {
        const activate: boolean = this.loginIfNecessary(state, router);
        console.log('About to return ' + activate + ' from canActivate(..)');
        return activate;
      }

      return true;
    }
  }
}
