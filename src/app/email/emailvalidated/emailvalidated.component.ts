import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { EmailActivationResponse, EmailActivationRequest } from '../email-response';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-emailvalidated',
  templateUrl: './emailvalidated.component.html'
})
export class EmailvalidatedComponent implements OnInit {
  errorActivatingEmail: string;
  emailActivation: boolean;
  emailActivationStatusMessage;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private translateService: TranslateService) {

  }

  ngOnInit() {
    this.activateUserEmail();
  }

  emailSuccessfullyActivated() {
    this.emailActivation = true;
  }

  emailFailedActivation() {
    this.emailActivation = false;
  }

  activateUserEmail() {
    const code = this.route.snapshot.queryParamMap.get('code');

    this.emailService.activateUserEmail(code).subscribe(
      (response: EmailActivationResponse) => {
        if (response.emailActivation) {
          this.emailSuccessfullyActivated();
        } else {
          this.emailFailedActivation();
        }
      },
      (error: Error) => {
        this.errorActivatingEmail = error.message;
      }
    );
  }
}
