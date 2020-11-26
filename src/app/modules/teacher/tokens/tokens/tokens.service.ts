import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentInitialData } from './tokens-request-response';

@Injectable({
  providedIn: 'root'
  })
export class TokensService {

  private GET_INITIAL_DATA_URL = '/examinprogress/teacher/token/getinitialdata';
  private GET_PAYMENT_INITIAL_DATA_URL = '/examinprogress/teacher/token/payment/getinitialdata';

  constructor(private http: HttpClient) { }

  getInitialData(): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: number) => {
          return response;
        }
    ));
  }

  getPaymentInitialData(): Observable<PaymentInitialData> {
    return this.http.get<PaymentInitialData>(`${this.GET_PAYMENT_INITIAL_DATA_URL}`);
  }
}
