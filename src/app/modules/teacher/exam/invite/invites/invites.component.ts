import { Component, OnInit, TemplateRef } from '@angular/core';
import { InvitesService } from './invites.service';
import { InvitesInitialData, InviteTransfer, DeleteResponse } from './invites-request-response';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  initialData: InvitesInitialData;
  invites: MatTableDataSource<InviteTransfer>;
  invitesColumns: string[] = ['name', 'examStartDate', 'viewInvite', 'actions'];
  inviteId: number;
  modalRef: BsModalRef;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: BsModalService,
    private invitesService: InvitesService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.invitesService.getInitialData(this.examId).subscribe(
      (initialData: InvitesInitialData) => {
        this.initialData = initialData;
        for (const i in initialData.inviteTransfers) {
          if (i !== null) {
            initialData.inviteTransfers[i].examStartDate = initialData.inviteTransfers[i].examStartDate.toString().
            split('T')[0];
          }
        }
        this.invites = new MatTableDataSource(initialData.inviteTransfers);
      }
    );
  }

  applyInviteFilter(filterValue: string) {
    this.invites.filter = filterValue.trim().toLowerCase();
  }

  invitesSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  deleteInviteConfirmation(template: TemplateRef<any>, inviteId) {
    this.inviteId = inviteId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteInviteConfirmed() {
    this.invitesService.deleteInvite(this.inviteId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/invite/invite_deleted';
          this.modalRef.hide();
          this.navigateBack();
        } else {
          this.message = 'teacher/exam/invite/invite_not_deleted';
        }
        this.invitesSnackBar(this.message);
      }
    );
  }

  decline() {
    this.modalRef.hide();
  }

  navigateBack(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
