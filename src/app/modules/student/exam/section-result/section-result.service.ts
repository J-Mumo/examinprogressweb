import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SectionPerformanceInitialData } from './section-result-request-response';

@Injectable({
  providedIn: 'root'
  })
export class SectionResultService {

  private GET_INITIAL_DATA_URL = '/examinprogress/student/exam/result/sectionresult';

  constructor(private http: HttpClient) { }

  getInitialData(sectionId: number): Observable<SectionPerformanceInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(sectionId)

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: SectionPerformanceInitialData) => {
          return response;
        }
    ));
  }
}
