import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveResponse, AddQuestionRequest, AddComprehensionQuestionRequest, SaveResponseWithId } from './add-question-request-response';

@Injectable({
  providedIn: 'root'
  })
export class AddQuestionService {

  ADD_QUESTION_URL = '/examinprogress/teacher/exam/section/question/save';
  ADD_COMPREHENSION_QUESTION_URL = '/examinprogress/teacher/exam/section/comprehensionquestion/save';

  constructor(private http: HttpClient) { }

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
