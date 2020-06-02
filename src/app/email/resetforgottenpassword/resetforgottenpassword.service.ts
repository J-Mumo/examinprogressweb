import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    VerificationResponse,
    UserResetForgottenPasswordRequest,
    SaveResponse,
    VerifyForgottenPasswordResetCodeRequest
} from './resetforgottenpassword-request-response';

@Injectable({
    providedIn: 'root'
})

export class ResetforgottenpasswordService {

    private VERIFIY_FORGOTTEN_PASSWORD_CODE_URL = '/examinprogress/user/verifyforgottenpasswordcode';
    private RESET_FORGOTTEN_PASSWORD_URL = '/examinprogress/user/resetforgottenpassword';

    constructor(private http: HttpClient) {

    }

    verifyForgottenPasswordResetCode(verifyForgottenPasswordResetCodeRequest:
        VerifyForgottenPasswordResetCodeRequest): Observable<VerificationResponse> {

        const body = JSON.stringify(verifyForgottenPasswordResetCodeRequest);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(this.VERIFIY_FORGOTTEN_PASSWORD_CODE_URL, body, httpOptions).pipe(map(
            (response: VerificationResponse) => {
                return response;
            }
        ));
    }

    resetForgottenPassword(userResetForgottenPasswordRequest: UserResetForgottenPasswordRequest):
        Observable<SaveResponse> {
        const body = JSON.stringify(userResetForgottenPasswordRequest);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(this.RESET_FORGOTTEN_PASSWORD_URL, body, httpOptions).pipe(map(
            (response: SaveResponse) => {
                return response;
            }
        ));
    }
}
