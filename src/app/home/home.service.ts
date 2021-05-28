import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SaveResponse, SendMessageRequest } from './home-request-response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private SEND_MESSAGE_URL = '/examinprogress/contact/save';
  private SUBSCRIBE_URL = '/examinprogress/contact/mailinglist/subscribe';

  constructor(private http: HttpClient) {}

  sendMessage(request: SendMessageRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(`${this.SEND_MESSAGE_URL}`, request);
  }

  subscribeToMailingList(email: string): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(`${this.SUBSCRIBE_URL}`, email);
  }
}
