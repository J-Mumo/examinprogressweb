import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SendInviteService } from './send-invite.service';
import { SaveResponse, SendInviteToEmailRequest, SendInviteRequest, SendInviteInitialData } from './send-invite-request-response';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss']
})
export class SendInviteComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  inviteId = Number(this.activatedRoute.snapshot.paramMap.get('inviteId'));
  emails = ['', ''];
  message: string;
  inviteMethod;
  inviteCode: string;
  initialData: SendInviteInitialData;
  copyState = 'Copy';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private sendInviteService: SendInviteService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.sendInviteService.getInitialData(this.inviteId).subscribe(
      (initiaData: SendInviteInitialData) => {
        this.initialData = initiaData;
      }
    );
  }

  public trackByFn(index) {
    return index;
  }

  changeCopyState() {
    this.copyState = 'Copied';
  }

  emailSentSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  sendInviteClick(form: NgForm, index) {
    const email = form.value['email_' + index];
    if (form.invalid) {
      document.getElementById('email_' + index + '-error').hidden = false;
    } else {
      document.getElementById('email_' + index + '-error').hidden = true;
      const request: SendInviteToEmailRequest = new SendInviteToEmailRequest(this.inviteId, email);
      this.sendInviteService.sendInviteToEmail(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/invite/invite_sent';
            document.getElementById('email-row_' + index).hidden = true;
            this.emails.push('');
          } else if (response.error !== null) {
            this.message = response.error;
          } else {
            this.message = 'teacher/exam/invite/invite_not_sent';
          }
          this.emailSentSnackBar(this.message);
        }
      );
    }
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      const controls = form.controls;
      let counter = 0;
      for (const name in controls) {
        if (controls[name].invalid) {
            document.getElementById('email_' + counter + '-error').hidden = false;
            counter++;
        } else {
          document.getElementById('email_' + counter + '-error').hidden = true;
          counter++;
        }
      }
    } else {

      for (const email in this.emails) {
        if (email === '') {
          this.emails.splice(this.emails.indexOf(email));
        }
      }

      const request: SendInviteRequest = new SendInviteRequest(this.inviteId, this.emails);
      this.sendInviteService.sendInvite(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/invite/invite_sent';
            this.router.navigate(['/teacher/exam/', this.examId, this.examName, 'invite', this.inviteId, 'view']);
          } else {
            this.message = 'teacher/exam/invite/invite_not_sent';
          }
          this.emailSentSnackBar(this.message);
        }
      );
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
