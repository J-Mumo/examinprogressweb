import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewSectionInitialData } from './view-section-request-response';

@Injectable({
  providedIn: 'root'
  })
export class ViewSectionService {

  GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/section/view/getinitialdata';

  constructor(private http: HttpClient) { }

  getInitialData(sectionId: number): Observable<ViewSectionInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(sectionId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: ViewSectionInitialData) => {
          return response;
        }
    ));
  }
}
