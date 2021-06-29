import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ViewInviteService } from './view-invite.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewInviteInitialData, SendInviteToEmailRequest, SaveResponse, DeleteResponse, SendInviteResponse, ExamTokenTransfer } from './view-invite-request-response';
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
  examTokenTransfers: ExamTokenTransfer[];
  deleteResponse: DeleteResponse;
  modalRef: BsModalRef;
  emails = ['', ''];
  message: string;
  examTokenId: number;
  email: string;
  copyState = 'Copy';
  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ]

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
        this.examTokenTransfers = initialData.examTokenTransfers;
      }
    );
  }

  public trackByFn(index) {
    return index;
  }

  changeCopyState() {
    this.viewInviteSnackBar('Copied');
  }

  viewInviteSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  deleteInviteConfirmation(template: TemplateRef<any>, inviteId) {
    this.inviteId = inviteId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteInviteConfirmed() {
    this.viewInviteService.deleteInvite(this.inviteId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/invite/invite_deleted';
          this.modalRef.hide();
          this.router.navigate(['/teacher/exam', this.examId, this.examName, 'invites']);
        } else {
          this.message = 'teacher/exam/invite/invite_not_deleted';
        }
        this.viewInviteSnackBar(this.message);
      }
    );
  }

  unsendConfirmation(template: TemplateRef<any>, examTokenId, email) {
    this.examTokenId = examTokenId;
    this.email = email;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  resendInviteConfirmation(template: TemplateRef<any>, examTokenId, email) {
    this.examTokenId = examTokenId;
    this.email = email;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  resendInvite() {
    this.viewInviteService.resendInvite(this.examTokenId).subscribe(
      (response: SaveResponse) => {
        if (response.saved) {
          this.message = `An invite has been resent to ${this.email}`;
        } else {
          this.message = 'Invite has not been re-sent, please try again';
          const err = document.getElementById(`email_${this.examTokenId}-error`)
          err.hidden = false;
          err.innerText = 'Invite has not been resent, please try again';
        }
        this.modalRef.hide();
        this.viewInviteSnackBar(this.message);
      }
    );
  }

  unsendInvite() {
    this.viewInviteService.unsendInvite(this.examTokenId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/invite/invite_unsent';
          this.navigateBack();
        } else {
          this.message = 'teacher/exam/invite/invite_unsent_failed';
          const err = document.getElementById(`email_${this.examTokenId}-error`)
          err.hidden = false;
          err.innerText = 'Cannot unsend invite to this email, the user has started the exam';
        }
        this.modalRef.hide();
        this.viewInviteSnackBar(this.message);
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
        (response: SendInviteResponse) => {
          if (response.sent) {
            this.message = 'teacher/exam/invite/invite_sent';
            this.navigateBack();
            document.getElementById('email-row_' + index).hidden = true;
            this.emails.push('');
          } else if (response.error !== null) {
            this.message = response.error;
            const err = document.getElementById(`emailresponse_${index}-error`);
            err.hidden = false;
            err.innerText = response.error;
            if (response.tokensError)
              document.getElementById(`tokensbutton-${index}`).hidden = false;
          } else {
            this.message = 'teacher/exam/invite/invite_not_sent';
          }
          this.viewInviteSnackBar(this.message);
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
