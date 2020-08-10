import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VerifyExamTokenRequest, VerifyExamTokenResponse } from './verify-exam-token-request-response';

@Injectable({
  providedIn: 'root'
})
export class VerifyExamTokenService {

  private VERIFY_TOKEN_URL = '/examinprogress/student/exam/token/verify';

  constructor(private http: HttpClient) {

  }

  verifyToken(request: VerifyExamTokenRequest):
    Observable<VerifyExamTokenResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.VERIFY_TOKEN_URL,
      request, httpOptions).pipe(map(
        (response: VerifyExamTokenResponse) => {
          return response;
        }
      ));
  }
}
