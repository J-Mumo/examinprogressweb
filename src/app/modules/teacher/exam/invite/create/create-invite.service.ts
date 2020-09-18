import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveResponseWithId, CreateInviteRequest, CreateInviteInitialData } from './create-invite-request-response';

@Injectable({
  providedIn: 'root'
})
export class CreateInviteService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/invite/create/getinitialdata';
  private CREATE_INVITE_URL = '/examinprogress/teacher/exam/invite/create/save';

  constructor(private http: HttpClient) {

  }

  getInitialData(examId: number): Observable<CreateInviteInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: CreateInviteInitialData) => {
          return response;
        }
    ));
  }

  save(request: CreateInviteRequest):
    Observable<SaveResponseWithId> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.CREATE_INVITE_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponseWithId) => {
          return response;
        }
      ));
  }
}
