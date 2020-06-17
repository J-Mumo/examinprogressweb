import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateSectionRequest, SaveResponseWithId } from './create-section-request-response';

@Injectable({
  providedIn: 'root'
})
export class CreateSectionService {

  private CREATE_EXAM_URL = '/examinprogress/teacher/exam/section/save';

  constructor(private http: HttpClient) {

  }

  save(registerRequest: CreateSectionRequest):
    Observable<SaveResponseWithId> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.CREATE_EXAM_URL,
      registerRequest, httpOptions).pipe(map(
        (response: SaveResponseWithId) => {
          return response;
        }
      ));
  }
}
