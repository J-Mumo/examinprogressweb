import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveResponseWithId, ExamRequest } from './create-exam-request-response';

@Injectable({
  providedIn: 'root'
})
export class CreateExamService {

  private CREATE_EXAM_URL = '/examinprogress/teacher/exam/save';

  constructor(private http: HttpClient) {

  }

  save(registerRequest: ExamRequest):
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
