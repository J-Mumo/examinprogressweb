import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExaminprogressResponse, AnswerRequest, SkipQuestionRequest } from './examinprogress-request-response';

@Injectable({
  providedIn: 'root'
})
export class ExaminprogressService {

  private EXAM_IN_PROGRESS_URL = '/examinprogress/student/exam/examinprogress/getexamprogress';
  private SAVE_ANSWER_URL = '/examinprogress/student/exam/examinprogress/save/answer';
  private SKIP_QUESTION_URL = '/examinprogress/student/exam/examinprogress/skipquestion';

  constructor(private http: HttpClient) {

  }

  getExamProgress(examTokenId: number):
    Observable<ExaminprogressResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examTokenId);

    return this.http.post(this.EXAM_IN_PROGRESS_URL, body, httpOptions).pipe(map(
        (response: ExaminprogressResponse) => {
          return response;
        }
      ));
  }

  saveAnswer(request: AnswerRequest): Observable<ExaminprogressResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.SAVE_ANSWER_URL, request, httpOptions).pipe(map(
        (response: ExaminprogressResponse) => {
          return response;
        }
      ));
  }

  skipQuestion(request: SkipQuestionRequest): Observable<ExaminprogressResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.SKIP_QUESTION_URL, request, httpOptions).pipe(map(
        (response: ExaminprogressResponse) => {
          return response;
        }
      ));
  }
}
