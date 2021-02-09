import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RtcTokenRequest, RtcTokenResponse } from './exam-room-request-response';

@Injectable({
  providedIn: 'root'
})
export class ExamRoomService {

  private RTC_TOKEN_URL = '/examinprogress/agora/rtctoken';
  private TERMINATE_EXAM_URL = '/examinprogress/teacher/rooms/terminate/student/exam';

  constructor(private http: HttpClient) {}

  getRtcToken(request: RtcTokenRequest): Observable<RtcTokenResponse> {
    return this.http.post<RtcTokenResponse>(`${this.RTC_TOKEN_URL}`, request);
  }

  terminateStudentExam(examTokenId: number) {
    return this.http.post<boolean>(`${this.TERMINATE_EXAM_URL}`, examTokenId);
  }
}
