import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailSentResponse, ForgottenPasswordRequest } from './forgotpassword-request-response';

@Injectable({
  providedIn: 'root'
})

export class ForgotpasswordService {

  FORGOT_PASSWORD_GET_INITIAL_DATA_URL = '/examinprogress/user/sendforgottenpasswordemail';

  constructor(private http: HttpClient) {

  }

  sendForgottenPasswordEmail(forgottenPasswordRequest: ForgottenPasswordRequest):
    Observable<EmailSentResponse> {
    const body = JSON.stringify(forgottenPasswordRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.FORGOT_PASSWORD_GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
      (response: EmailSentResponse) => {
        return response;
      }
    ));
  }
}
