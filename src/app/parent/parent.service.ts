import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ParentService {

  showNavBar = false;
  hidePublicHeader = false;
  hidePrivateHeader = false;

  constructor(
    private http: HttpClient) {

  }
}
