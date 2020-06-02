import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterRequest, SaveResponse } from './register-request-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private REGISTER_URL = '/examinprogress/user/register/save';

  constructor(private http: HttpClient) {

  }

  save(registerRequest: RegisterRequest):
    Observable<SaveResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.REGISTER_URL,
      registerRequest, httpOptions).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
