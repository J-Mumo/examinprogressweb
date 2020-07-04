import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveResponse, AddQuestionRequest, AddComprehensionQuestionRequest, SaveResponseWithId, AddQuestionInitialData } from './add-question-request-response';

@Injectable({
  providedIn: 'root'
  })
export class AddQuestionService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/exam/section/question/add/getinitialdata';
  private ADD_QUESTION_URL = '/examinprogress/teacher/exam/section/question/add/save';
  private ADD_COMPREHENSION_QUESTION_URL = '/examinprogress/teacher/exam/section/comprehensionquestion/add/save';

  constructor(private http: HttpClient) { }

  getInitialData(sectionId: number): Observable<AddQuestionInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(sectionId);

    return this.http.post(
      this.GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: AddQuestionInitialData) => {
          return response;
        }
    ));
  }

  saveQuestion(request: AddQuestionRequest):
    Observable<SaveResponse> {
      const headers = new HttpHeaders();

      return this.http.post(
        this.ADD_QUESTION_URL, request, { headers }).pipe(map(
          (response: SaveResponse) => {
            return response;
          }
        ));
  }

  saveComprehensionQuestion(request: AddComprehensionQuestionRequest):
    Observable<SaveResponseWithId> {
      const headers = new HttpHeaders();

      return this.http.post(
        this.ADD_COMPREHENSION_QUESTION_URL, request, { headers }).pipe(map(
          (response: SaveResponseWithId) => {
            return response;
          }
        ));
  }
}
