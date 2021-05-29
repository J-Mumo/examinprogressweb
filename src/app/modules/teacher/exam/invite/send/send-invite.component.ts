import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SendInviteService } from './send-invite.service';
import { SaveResponse, SendInviteRequest, SendInviteInitialData } from './send-invite-request-response';
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
  message: string;
  inviteMethod;
  inviteCode: string;
  initialData: SendInviteInitialData;
  copyState = 'Copy';
  invalidEmails = [];

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
    this.emailSentSnackBar('Copied');
  }

  emailSentSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  onSubmit(form: NgForm) {
    const emails: string[] = form.value.emails.toLowerCase().split(/[\s\n,]+/)
    let validEmails = [];
    this.invalidEmails = [];
    const emailPattern = /^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}/;
    emails.forEach(email => {
      email.trim();
      if (email.length > 0) {
        if (emailPattern.test(email))
          validEmails.push(email)
        else
          this.invalidEmails.push(email)
      }
    })

    const request: SendInviteRequest = new SendInviteRequest(this.inviteId, validEmails);
    this.sendInviteService.sendInvite(request).subscribe(
      (response: SaveResponse) => {
        if (response.saved) {
          this.message = 'teacher/exam/invite/invite_sent';
          if (this.invalidEmails.length < 1)
            this.router.navigate(['/teacher/exam/', this.examId, this.examName, 'invite', this.inviteId, 'view']);
        } else {
          this.message = 'teacher/exam/invite/invite_not_sent';
        }
        this.emailSentSnackBar(this.message);
      }
    );
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
