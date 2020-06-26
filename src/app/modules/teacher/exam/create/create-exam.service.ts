import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveResponseWithId, CreateExamRequest, CreateExamInitialData } from './create-exam-request-response';

@Injectable({
  providedIn: 'root'
})
export class CreateExamService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/create/getinitialdata';
  private CREATE_EXAM_URL = '/examinprogress/teacher/exam/save';

  constructor(private http: HttpClient) {

  }

  getInitialData(): Observable<CreateExamInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: CreateExamInitialData) => {
          return response;
        }
    ));
  }

  save(request: CreateExamRequest):
    Observable<SaveResponseWithId> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.CREATE_EXAM_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponseWithId) => {
          return response;
        }
      ));
  }
}
