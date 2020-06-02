import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  EmailActivationResponse,
  EmailSentResponse,
  ResendEmailActivationRequest
} from './email-response';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  SEND_USER_ACTIVATION_EMAIL_URL = '/examinprogress/user/email/sendactivationemail';
  ACTIVATE_USER_EMAIL_URL = '/examinprogress/user/activate';
  RESEND_USER_ACTIVATION_EMAIL_URL = '/examinprogress/user/resendactivationemail';
  FORGOTTEN_PASSWORD_EMAIL_URL = '/examinprogress/user/email/sendforgottenpasswordemail';

  constructor(private http: HttpClient) { }

  activateUserEmail(emailActivationCode: string): Observable<EmailActivationResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.ACTIVATE_USER_EMAIL_URL, emailActivationCode, httpOptions).pipe(map(
      (response: EmailActivationResponse) => {
        return response;
      }
    ));
  }

  resendActivationEmail(resendEmailActivationRequest: ResendEmailActivationRequest): Observable<EmailSentResponse> {
    const body = JSON.stringify(resendEmailActivationRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(
      this.RESEND_USER_ACTIVATION_EMAIL_URL, body, httpOptions).pipe(map(
        (response: EmailSentResponse) => {
          return response;
        }
      ));
  }

  sendForgottenPasswordEmail(resendEmailActivationRequest: ResendEmailActivationRequest): Observable<EmailSentResponse> {
    const body = JSON.stringify(resendEmailActivationRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(
      this.FORGOTTEN_PASSWORD_EMAIL_URL, body, httpOptions).pipe(map(
        (response: EmailSentResponse) => {
          return response;
        }
      ));
  }
}
