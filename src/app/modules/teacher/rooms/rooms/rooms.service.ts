import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExamsInitialData } from './rooms-request-response';

@Injectable({
  providedIn: 'root'
  })
export class RoomsService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/rooms/getinitialdata';

  constructor(private http: HttpClient) { }

  getInitialData(): Observable<ExamsInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: ExamsInitialData) => {
          return response;
        }
    ));
  }
}
