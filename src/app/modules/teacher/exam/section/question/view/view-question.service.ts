import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewQuestionInitialData } from './view-question-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ViewQuestionService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/section/question/view/getinitialdata';

  constructor(private http: HttpClient) { }

  getInitialData(questionId: number): Observable<ViewQuestionInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(questionId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ViewQuestionInitialData) => {
          return response;
        }
    ));
  }
}
