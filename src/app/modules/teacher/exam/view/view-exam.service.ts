import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewExamInitialData, DeleteResponse } from './view-exam-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ViewExamService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/view/getinitialdata';
  DELETE_EXAM_URL = '/examinprogress/teacher/exam/delete';
  DELETE_SECTION_URL = '/examinprogress/teacher/exam/section/delete';

  constructor(private http: HttpClient) { }

  getInitialData(examId: number): Observable<ViewExamInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ViewExamInitialData) => {
          return response;
        }
    ));
  }

  deleteExam(examId: number):
    Observable<DeleteResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examId);

    return this.http.post(this.DELETE_EXAM_URL,
      body, httpOptions).pipe(map(
        (response: DeleteResponse) => {
          return response;
        }
      ));
  }

  deleteSection(sectionId: number):
    Observable<DeleteResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(sectionId);

    return this.http.post(this.DELETE_SECTION_URL,
      body, httpOptions).pipe(map(
        (response: DeleteResponse) => {
          return response;
        }
      ));
  }
}
