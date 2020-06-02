import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgottenPasswordRequest, EmailSentResponse } from './forgotpassword-request-response';
import { ForgotpasswordService } from './forgotpassword.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  public sitekey = '6Lc133sUAAAAAB-0ea4zIuxM1gHFR7qh6DyXuWfa';

  errorForgottenPassword: string;
  emailHasBeenSent: boolean;
  cannotFindEmail: boolean;
  unexpectedError: boolean;
  unexpectedErrorStr: string;
  forgottenPasswordRequest: ForgottenPasswordRequest;

  lang: string = this.translateService.currentLang;

  constructor(
    private forgotpasswordService: ForgotpasswordService,
    private translateService: TranslateService) {
  }

  ngOnInit() {

  }

  showEmailHasBeenSent(response) {
    this.emailHasBeenSent = true;
    this.cannotFindEmail = false;
  }

  showCannotFindEmail(response) {
    this.cannotFindEmail = true;
  }

  ShowUnexpectedError(error) {
    this.unexpectedError = true;
    this.unexpectedErrorStr = error.string;
  }

  onSubmitEmail(form: NgForm) {
    const email = form.controls.email.value;
    const forgottenPasswordRequest = new ForgottenPasswordRequest(email);

    this.forgotpasswordService.sendForgottenPasswordEmail(forgottenPasswordRequest).subscribe(
      (response: EmailSentResponse) => {

        if (response.emailSent) {
          this.showEmailHasBeenSent(response);
        } else {
          this.showCannotFindEmail(response);
        }
      },
      (error: Error) => {
        this.ShowUnexpectedError(error);
      }
    );
  }
}
