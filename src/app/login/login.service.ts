import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginInitialData } from './login-request-response';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    firstName: string;
    public userId: number;
    GET_LOGIN_INITIAL_DATA_URL = '/examinprogress/user/loggedinuserdetails/get';

    constructor(private http: HttpClient) {

    }

    getLoginInitialData(username: string): Observable<LoginInitialData> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(
            this.GET_LOGIN_INITIAL_DATA_URL, username, httpOptions).pipe(map(
                (initialData: LoginInitialData) => {
                    this.userId = initialData.userId;
                    return initialData;
                }
            ));
    }
}
