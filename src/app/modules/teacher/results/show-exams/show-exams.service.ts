import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowExamsInitialData } from './show-exams-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ShowExamsService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/results/exams/getinitialdata';

  constructor(private http: HttpClient) { }

  getInitialData(): Observable<ShowExamsInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: ShowExamsInitialData) => {
          return response;
        }
    ));
  }
}
