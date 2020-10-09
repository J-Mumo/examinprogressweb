import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultsInitialData } from './results-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ResultsService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/results/examresults/initialdata';

  constructor(private http: HttpClient) { }

  getInitialData(examId: number): Observable<ResultsInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ResultsInitialData) => {
          return response;
        }
    ));
  }
}
