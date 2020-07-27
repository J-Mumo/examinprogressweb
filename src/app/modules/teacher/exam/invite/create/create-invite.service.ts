import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveResponseWithId, CreateInviteRequest } from './create-invite-request-response';

@Injectable({
  providedIn: 'root'
})
export class CreateInviteService {

  private CREATE_INVITE_URL = '/examinprogress/teacher/exam/invite/create/save';

  constructor(private http: HttpClient) {

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
