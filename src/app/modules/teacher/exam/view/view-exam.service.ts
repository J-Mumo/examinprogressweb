import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewExamInitialData } from './view-exam-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ViewExamService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/view/getinitialdata';

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
}
