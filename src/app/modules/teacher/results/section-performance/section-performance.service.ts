import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SectionPerformanceRequestInitialData, SectionPerformanceInitialData } from './section-performance-request-response';

@Injectable({
  providedIn: 'root'
  })
export class SectionPerformanceService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/results/examresults/sectionperformance';

  constructor(private http: HttpClient) { }

  getInitialData(request: SectionPerformanceRequestInitialData): Observable<SectionPerformanceInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, request, httpOptions).pipe(map(
        (response: SectionPerformanceInitialData) => {
          return response;
        }
    ));
  }
}
