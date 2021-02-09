import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewPerformanceInitialData } from './exam-result-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ExamResultService {

  private GET_INITIAL_DATA_URL = '/examinprogress/student/exam/result';

  constructor(private http: HttpClient) { }

  getInitialData(examTokenId: number): Observable<ViewPerformanceInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examTokenId)

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ViewPerformanceInitialData) => {
          return response;
        }
    ));
  }
}
