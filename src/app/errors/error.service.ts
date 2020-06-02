import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorDetails, ErrorInitialData } from './error-response';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  error: string;
  router: Router;
  GET_ERROR_INITIAL_DATA_URL = '/examinprogress/error/getinitialdata';

  constructor(
    private injector: Injector,
    private http: HttpClient,
    private spinner: NgxSpinnerService) { }

  private handleOffLine(router: Router): void {
    // Commented out temporarly an offline page is show while working online
    router.navigate(['/erroroffline']);
  }

  private handle401(router: Router): void {
    router.navigate(['/login', {
      tokenExpired: 'error/token_expired'
    }]);
  }

  private handle400(router: Router): void {
    router.navigate(['/login', {
      tokenExpired: 'error/token_expired'
    }]);
  }

  private buildErrorMessage(error: HttpErrorResponse): string {
    let customError = '';

    customError =
      error.error.message + ' ' +
      error.message + ' ' +
      error.error.error_description + ' ' +
      error.error.error;

    return customError.replace(/undefined/gi, '');
  }

  private handleErrorDetails(
    errorDetails: ErrorDetails,
    error: HttpErrorResponse, router: Router): void {

    router.navigate(['/error',
      {
        status: error.status,
        redirectTo: router.routerState.snapshot.url,
        errorMessage: errorDetails.message,
        errorId: errorDetails.errorId,
        timestamp: errorDetails.timestamp
      }]
    );
  }

  private handleNoErrorDetailsPresent(
    error: HttpErrorResponse,
    router: Router): void {
    if (error.error.error === 'invalid_grant') {
      this.error = 'error/login/invalid_username_or_password';

    } else if (error.error.error === 'unauthorized') {
      this.error = 'login/you_do_not_have_permission_to_access_this_domain';

    } else {
      router.navigate(['/error',
        {
          status: error.status,
          redirectTo: router.routerState.snapshot.url,
          errorMessage: this.buildErrorMessage(error),
          errorId: 'NONE',
          timestamp: Date.now()
        }]
      );
    }
  }

  private handleHttpResponseError(
    error: HttpErrorResponse,
    router: Router): void {
    if (!navigator.onLine) {
      this.handleOffLine(router);
    } else if (error.status === 401) {
      this.handle401(router);
    } else {
      const errorDetails: ErrorDetails = error.error;
      if (errorDetails.errorId != null) {
        this.handleErrorDetails(errorDetails, error, router);
      } else {
        this.handleNoErrorDetailsPresent(error, router);
      }
    }
  }

  private handleNullError(error: HttpErrorResponse, router: Router) {
    router.navigate(['/error',
      {
        status: error.status,
        redirectTo: router.routerState.snapshot.url,
        errorMessage: error.message,
        errorId: 'NONE',
        timestamp: Date.now()
      }]
    );
  }

  private handleAngularError(error: Error, router: Router) {

    router.navigate(['/error',
      {
        status: 'AngularError',
        redirectTo: router.routerState.snapshot.url,
        errorMessage: error.stack,
        timestamp: Date.now()
      }]
    );
  }

  getInitialData(): Observable<ErrorInitialData> {

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    return this.http.post(
      this.GET_ERROR_INITIAL_DATA_URL, httpOptions).pipe(map(
        (response: ErrorInitialData) => {
          return response;
        }
      ));
  }

  handleError(error: Error | HttpErrorResponse) {

    const router: Router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      if (error.error === null) {
        this.handleNullError(error, router);
        this.spinner.hide();
      } else {
        this.handleHttpResponseError(error, router);
        this.spinner.hide();
      }
    } else {
      this.handleAngularError(error, router);
      this.spinner.hide();
    }
    this.spinner.hide();
    throw error;
  }
}
