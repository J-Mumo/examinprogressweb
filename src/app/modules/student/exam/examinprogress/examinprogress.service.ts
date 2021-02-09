import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExaminprogressResponse, AnswerRequest, SkipQuestionRequest, SkipSectionRequest, RtcTokenResponse, RtcTokenRequest } from './examinprogress-request-response';

@Injectable({
  providedIn: 'root'
})
export class ExaminprogressService {

  private EXAM_IN_PROGRESS_URL = '/examinprogress/student/exam/examinprogress/getexamprogress';
  private SAVE_ANSWER_URL = '/examinprogress/student/exam/examinprogress/save/answer';
  private SKIP_QUESTION_URL = '/examinprogress/student/exam/examinprogress/skipquestion';
  private SKIP_SECTION_URL = '/examinprogress/student/exam/examinprogress/skipsection';
  private TERMINATE_EXAM_URL = '/examinprogress/student/exam/examinprogress/terminate';
  private RTC_TOKEN_URL = '/examinprogress/agora/rtctoken';

  constructor(private http: HttpClient) {

  }

  getRtcToken(request: RtcTokenRequest): Observable<RtcTokenResponse> {
    return this.http.post<RtcTokenResponse>(`${this.RTC_TOKEN_URL}`, request);
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

  skipSection(request: SkipSectionRequest): Observable<ExaminprogressResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.SKIP_SECTION_URL, request, httpOptions).pipe(map(
        (response: ExaminprogressResponse) => {
          return response;
        }
      ));
  }

  terminateExam(examTokenId: number): Observable<ExaminprogressResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(examTokenId);

    return this.http.post(this.TERMINATE_EXAM_URL, body, httpOptions).pipe(map(
        (response: ExaminprogressResponse) => {
          return response;
        }
      ));
  }
}
