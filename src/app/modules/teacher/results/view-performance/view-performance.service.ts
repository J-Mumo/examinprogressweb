import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewPerformanceRequestInitialData, ViewPerformanceInitialData } from './view-performance-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ViewPerformanceService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/results/examresults/viewperformance';

  constructor(private http: HttpClient) { }

  getInitialData(request: ViewPerformanceRequestInitialData): Observable<ViewPerformanceInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, request, httpOptions).pipe(map(
        (response: ViewPerformanceInitialData) => {
          return response;
        }
    ));
  }
}
