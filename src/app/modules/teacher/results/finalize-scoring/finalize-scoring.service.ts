import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveResponseWithId } from '../../exam/create/create-exam-request-response';
import { FinalizeScoringRequestInitialData, FinalizeScoringInitialData, FinalizeScoringRequest, SaveResponse } from './finalize-scoring-request-response';

@Injectable({
  providedIn: 'root'
  })
export class FinalizeScoringService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/results/examresults/finalizescoring';
  private FINALIZE_SCORE_URL = '/examinprogress/teacher/results/examresults/finalizescore';

  constructor(private http: HttpClient) { }

  getInitialData(request: FinalizeScoringRequestInitialData): Observable<FinalizeScoringInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, request, httpOptions).pipe(map(
        (response: FinalizeScoringInitialData) => {
          return response;
        }
    ));
  }

  save(request: FinalizeScoringRequest): Observable<SaveResponse> {
    const headers = new HttpHeaders();

    return this.http.post(this.FINALIZE_SCORE_URL, request, { headers }).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
