import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditQuestionInitialData, EditQuestionRequest, SaveResponseWithId } from './edit-question-request-response';

@Injectable({
  providedIn: 'root'
  })
export class EditQuestionService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/section/question/edit/getinitialdata';
  private EDIT_QUESTION_URL = '/examinprogress/teacher/exam/section/question/edit/save';

  constructor(private http: HttpClient) { }

  getInitialData(questionId: number): Observable<EditQuestionInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(questionId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: EditQuestionInitialData) => {
          return response;
        }
    ));
  }

  save(request: EditQuestionRequest): Observable<SaveResponseWithId> {
    const headers = new HttpHeaders();

    return this.http.post(
      this.EDIT_QUESTION_URL, request, { headers }).pipe(map(
        (response: SaveResponseWithId) => {
          return response;
        }
      ));
  }
}
