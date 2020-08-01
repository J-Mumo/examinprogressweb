import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InvitesInitialData, DeleteResponse } from './invites-request-response';

@Injectable({
  providedIn: 'root'
})
export class InvitesService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/invite/invites/getinitialdata';
  private DELETE_INVITE_URL = '/examinprogress/teacher/exam/invite/delete';

  constructor(private http: HttpClient) {

  }

  getInitialData(inviteId: number): Observable<InvitesInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(inviteId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: InvitesInitialData) => {
          return response;
        }
    ));
  }

  deleteInvite(inviteId: number):
    Observable<DeleteResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(inviteId);

    return this.http.post(this.DELETE_INVITE_URL,
      body, httpOptions).pipe(map(
        (response: DeleteResponse) => {
          return response;
        }
      ));
  }
}
