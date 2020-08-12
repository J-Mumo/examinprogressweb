import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExamDetailInitialData, ExamDetailRequest } from './exam-detail-request-response';

@Injectable({
  providedIn: 'root'
})
export class ExamDetailService {

  private VERIFY_TOKEN_URL = '/examinprogress/student/exam/detail/initialdata';

  constructor(private http: HttpClient) {

  }

  getInitialData(request: ExamDetailRequest):
    Observable<ExamDetailInitialData> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.VERIFY_TOKEN_URL,
      request, httpOptions).pipe(map(
        (response: ExamDetailInitialData) => {
          return response;
        }
      ));
  }
}
