import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewInviteInitialData, SendInviteToEmailRequest, SaveResponse, DeleteResponse } from './view-invite-request-response';

@Injectable({
  providedIn: 'root'
})
export class ViewInviteService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/invite/view/getinitialdata';
  private SEND_INVITE_TO_EMAIL_URL = '/examinprogress/teacher/exam/invite/sendtoemail';
  private UNSEND_INVITE_TO_EMAIL_URL = '/examinprogress/teacher/exam/invite/unsendtoemail';

  constructor(private http: HttpClient) {

  }

  getInitialData(inviteId: number): Observable<ViewInviteInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(inviteId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ViewInviteInitialData) => {
          return response;
        }
    ));
  }

  sendInviteToEmail(request: SendInviteToEmailRequest):
    Observable<SaveResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.SEND_INVITE_TO_EMAIL_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }

  unsendInvite(examTokenId: number):
    Observable<DeleteResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examTokenId);

    return this.http.post(this.UNSEND_INVITE_TO_EMAIL_URL,
      body, httpOptions).pipe(map(
        (response: DeleteResponse) => {
          return response;
        }
      ));
  }
}
