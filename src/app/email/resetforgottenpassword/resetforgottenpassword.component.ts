import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmailService } from '../email.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  UserResetForgottenPasswordRequest,
  VerificationResponse,
  VerifyForgottenPasswordResetCodeRequest,
  SaveResponse
} from './resetforgottenpassword-request-response';
import { ResetforgottenpasswordService } from './resetforgottenpassword.service';

@Component({
  selector: 'app-resetforgottenpassword',
  templateUrl: './resetforgottenpassword.component.html',
  styleUrls: ['./resetforgottenpassword.component.scss']
})
export class ResetforgottenpasswordComponent implements OnInit {

  data: VerificationResponse;
  passwordHasbeenReset: boolean;
  passwordResetLinkAlreadyUsed: boolean;
  passwordResentLinkInvalid: boolean;
  passwordNotReset: boolean;
  passwordResetError: boolean;
  constructor(
    private router: Router,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private resetForgottenPasswordService: ResetforgottenpasswordService) { }

  ngOnInit() {
    this.verifyForgottenPasswordResetCode();
  }

  verifyForgottenPasswordResetCode() {
    const code = this.route.snapshot.queryParamMap.get('code');
    const userId = Number(this.route.snapshot.queryParamMap.get('userid'));

    const verifyForgottenPasswordResetCodeRequest =
      new VerifyForgottenPasswordResetCodeRequest(userId, code);

    this.resetForgottenPasswordService.verifyForgottenPasswordResetCode(
      verifyForgottenPasswordResetCodeRequest).subscribe(
        (verification: VerificationResponse) => {
          this.data = verification;

          if (verification.status) {
            this.showLinkAlreadyUsed();
          } else if (!verification.status && verification.response === null) {
            this.showLinkIsInvalid();
          }
        },
        (error: Error) => {

        }
      );
  }

  showPasswordReset(response) {
    this.passwordHasbeenReset = true;
  }

  showLinkAlreadyUsed() {
    this.passwordResetLinkAlreadyUsed = true;
  }

  showLinkIsInvalid() {
    this.passwordResentLinkInvalid = true;
  }

  showPasswordNotReset(response) {
    this.passwordNotReset = true;

  }

  login() {
    this.router.navigate(['/login']);
  }

  showPasswordResetError(error) {
    this.passwordResetError = true;
  }

  onSubmitNewPassword(form: NgForm) {
    const password = form.controls.password.value;
    const userId = Number(this.route.snapshot.queryParamMap.get('userid'));
    const code = this.route.snapshot.queryParamMap.get('code');

    const userResetForgottenPasswordRequest =
      new UserResetForgottenPasswordRequest(userId, code, password);

    this.resetForgottenPasswordService.resetForgottenPassword(userResetForgottenPasswordRequest).subscribe(
      (response: SaveResponse) => {

        if (response.saved) {
          this.showPasswordReset(response);
        } else {
          this.showPasswordNotReset(response);
        }
      },
      (error: Error) => {
        this.showPasswordResetError(error);
      }
    );
  }
}
