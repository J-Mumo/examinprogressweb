import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateSectionRequest, SaveResponseWithId } from './create-section-request-response';

@Injectable({
  providedIn: 'root'
})
export class CreateSectionService {

  private CREATE_SECTION_URL = '/examinprogress/teacher/exam/section/create/save';

  constructor(private http: HttpClient) {

  }

  save(request: CreateSectionRequest):
    Observable<SaveResponseWithId> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.CREATE_SECTION_URL,
      request, httpOptions).pipe(map(
        (response: SaveResponseWithId) => {
          return response;
        }
      ));
  }
}
