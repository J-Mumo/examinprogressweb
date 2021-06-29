import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendInviteRequest, SendInviteResponse, SendInviteInitialData } from './send-invite-request-response';

@Injectable({
  providedIn: 'root'
})
export class SendInviteService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/invite/send/getinitialdata';
  private SEND_INVITE_URL = '/examinprogress/teacher/exam/invite/send';

  constructor(private http: HttpClient) {

  }

  getInitialData(inviteId: number): Observable<SendInviteInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(inviteId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: SendInviteInitialData) => {
          return response;
        }
    ));
  }

  sendInvite(request: SendInviteRequest): Observable<SendInviteResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.SEND_INVITE_URL,
      request, httpOptions).pipe(map(
        (response: SendInviteResponse) => {
          return response;
        }
      ));
  }
}
