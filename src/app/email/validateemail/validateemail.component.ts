import { Component, OnInit } from '@angular/core';
import { EmailSentResponse, ResendEmailActivationRequest } from '../email-response';
import { UserService } from '../../services/user/user.service';
import { EmailService } from '../email.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-validateemail',
  templateUrl: './validateemail.component.html',
})
export class ValidateemailComponent implements OnInit {
  errorValidatingEmail: string;
  error: boolean;
  success: boolean;
  email: string;

  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.error = false;
    this.success = false;
  }

  emailSent(response, email) {
    this.success = true;

  }

  emailNotSent(response) {
    this.error = false;
  }

  unknownError(error) {
    // this.error = false;
  }

  resendActivationEmail() {
    this.email = this.userService.loggedInEmail;
    const localeStr = this.translateService.currentLang;
    const resendEmailActivationRequest = new ResendEmailActivationRequest(this.email, localeStr);

    this.emailService.resendActivationEmail(resendEmailActivationRequest).subscribe(
      (response: EmailSentResponse) => {
        if (response.emailSent) {
          this.emailSent(response, this.email);
        } else {
          this.emailNotSent(response);
        }
      },
      (error: Error) => {
        this.unknownError(error);
      }
    );
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
