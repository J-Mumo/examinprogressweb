import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ViewInviteService } from './view-invite.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewInviteInitialData, SendInviteToEmailRequest, SaveResponse, DeleteResponse } from './view-invite-request-response';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-invite',
  templateUrl: './view-invite.component.html',
  styleUrls: ['./view-invite.component.scss']
})
export class ViewInviteComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  inviteId = Number(this.activatedRoute.snapshot.paramMap.get('inviteId'));
  initialData: ViewInviteInitialData;
  modalRef: BsModalRef;
  emails = ['', ''];
  message: string;
  examTokenId: number;
  emailToUnsend: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private viewInviteService: ViewInviteService,
    private modalService: BsModalService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewInviteService.getInitialData(this.inviteId).subscribe(
      (initialData: ViewInviteInitialData) => {
        this.initialData = initialData;
      }
    );
  }

  public trackByFn(index) {
    return index;
  }

  emailSentSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  unsendConfirmation(template: TemplateRef<any>, examTokenId, email) {
    this.examTokenId = examTokenId;
    this.emailToUnsend = email;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  unsendInvite() {
    this.viewInviteService.unsendInvite(this.examTokenId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/invite/invite_unsent';
          this.navigateBack();
        } else {
          this.message = 'teacher/exam/invite/invite_unsent_failed';
        }
        this.emailSentSnackBar(this.message);
      }
    );
  }

  decline() {
    this.modalRef.hide();
  }

  sendInviteClick(form: NgForm, index) {
    const email = form.value['email_' + index];
    if (form.invalid) {
      document.getElementById('email_' + index + '-error').hidden = false;
    } else {
      document.getElementById('email_' + index + '-error').hidden = true;
      const request: SendInviteToEmailRequest = new SendInviteToEmailRequest(this.inviteId, email);
      this.viewInviteService.sendInviteToEmail(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/invite/invite_sent';
            this.navigateBack();
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

  navigateBack(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
