import { tap } from 'rxjs/operators';
import {
  HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  errorService: ErrorService;

  constructor(private injector: Injector) {
    this.errorService = injector.get(ErrorService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errorService.handleError(err);
      }
    }));
  }
}

