import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditSectionInitialData, EditSectionRequest, SaveResponse } from './edit-section-request-response';

@Injectable({
  providedIn: 'root'
  })
export class EditSectionService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/section/edit/getinitialdata';
  private EDIT_SECTION_URL = '/examinprogress/teacher/exam/section/edit/save';

  constructor(private http: HttpClient) { }

  getInitialData(sectionId: number): Observable<EditSectionInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(sectionId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: EditSectionInitialData) => {
          return response;
        }
    ));
  }

  save(request: EditSectionRequest): Observable<SaveResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.EDIT_SECTION_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
