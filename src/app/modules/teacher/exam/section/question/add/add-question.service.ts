import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveResponse, AddQuestionRequest } from './add-question-request-response';

@Injectable({
  providedIn: 'root'
  })
export class AddQuestionService {

  ADD_MULTIPLECHOICE_QUESTION_URL = '/examinprogress/teacher/exam/section/multiplechoicequestion/save';

  constructor(private http: HttpClient) { }

  save(request: AddQuestionRequest):
    Observable<SaveResponse> {
      const headers = new HttpHeaders();

      return this.http.post(
        this.ADD_MULTIPLECHOICE_QUESTION_URL, request, { headers }).pipe(map(
          (response: SaveResponse) => {
            return response;
          }
        ));
  }

}
