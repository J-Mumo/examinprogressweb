import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewSectionInitialData, DeleteResponse } from './view-section-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ViewSectionService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/section/view/getinitialdata';
  DELETE_SECTION_URL = '/examinprogress/teacher/exam/section/delete';
  DELETE_QUESTION_URL = '/examinprogress/teacher/exam/section/question/delete';

  constructor(private http: HttpClient) { }

  getInitialData(sectionId: number): Observable<ViewSectionInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(sectionId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ViewSectionInitialData) => {
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

  deleteQuestion(questionId: number):
    Observable<DeleteResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(questionId);

    return this.http.post(this.DELETE_QUESTION_URL,
      body, httpOptions).pipe(map(
        (response: DeleteResponse) => {
          return response;
        }
      ));
  }
}
