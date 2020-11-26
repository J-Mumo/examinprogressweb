import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  })
export class DashboardService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/token/getinitialdata';

  constructor(private http: HttpClient) { }

  getInitialData(): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: number) => {
          return response;
        }
    ));
  }
}
