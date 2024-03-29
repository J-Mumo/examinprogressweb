import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentExamsInitialData } from './exams-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ExamsService {

  GET_INITIAL_DATA_URL = '/examinprogress/student/exam/exams/initialdata';

  constructor(private http: HttpClient) { }

  getInitialData(): Observable<StudentExamsInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: StudentExamsInitialData) => {
          return response;
        }
    ));
  }
}
