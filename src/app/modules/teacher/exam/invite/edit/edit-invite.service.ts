import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveResponse, EditInviteInitialData, EditInviteRequest } from './edit-invite-request-response';

@Injectable({
  providedIn: 'root'
})
export class EditInviteService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/invite/edit/getinitialdata';
  private EDIT_INVITE_URL = '/examinprogress/teacher/exam/invite/edit/save';

  constructor(private http: HttpClient) {

  }

  getInitialData(inviteId: number): Observable<EditInviteInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(inviteId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: EditInviteInitialData) => {
          return response;
        }
    ));
  }

  save(request: EditInviteRequest):
    Observable<SaveResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.EDIT_INVITE_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
