import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditExamInitialData, EditExamRequest, SaveResponse } from './edit-exam-request-response';

@Injectable({
  providedIn: 'root'
  })
export class EditExamService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/edit/getinitialdata';
  private EDIT_EXAM_URL = '/examinprogress/teacher/exam/edit/save';

  constructor(private http: HttpClient) { }

  getInitialData(examId: number): Observable<EditExamInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: EditExamInitialData) => {
          return response;
        }
    ));
  }

  save(request: EditExamRequest):
    Observable<SaveResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.EDIT_EXAM_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
