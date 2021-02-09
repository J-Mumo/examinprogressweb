import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExamDetailService } from './exam-detail.service';
import { ExamDetailInitialData, ExamDetailRequest } from './exam-detail-request-response';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  initialData: ExamDetailInitialData;
  examExists: boolean;
  isToday: boolean;
  code: string;
  inviteLink: boolean;
  mediaPermissionsGranted = false;
  modalRef: BsModalRef;
  mediaStreamConstraints = {
    video: true,
    audio: true
  };

  @ViewChild('permissionsError', { static: false })
  permissionsError: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private modalService: BsModalService,
    private examDetailService: ExamDetailService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.getUserMedia();
  }

  getInitialData() {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    const inviteCode = this.activatedRoute.snapshot.queryParamMap.get('invitecode');
    this.inviteLink = inviteCode !== null ? true : false;
    this.code = this.inviteLink ? inviteCode : token;

    const request: ExamDetailRequest = new ExamDetailRequest(this.inviteLink, this.code);

    this.examDetailService.getInitialData(request).subscribe(
      (initialData: ExamDetailInitialData) => {
        this.initialData = initialData;
        if (initialData.examExists) {
          this.examExists = true;
        }
        const today = new Date(new Date().toDateString());
        const startDate = new Date(new Date(initialData.startDate).toDateString());
        if (today >= startDate) {
          this.isToday = true;
        }
      }
    );
  }

  getUserMedia() {
    navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints).then(function(){
      this.mediaPermissionsGranted = true;
    }).catch(this.handleGetUserMediaError);
  }

  handleGetUserMediaError(error) {
    if (error.name === 'NotAllowedError'){
      console.log('-------------')
      // console.log(this.permissionsError)
      console.log('-------------')
      this.modalRef = this.modalService.show(this.permissionsError, { class: 'modal-sm' });
    }
    console.log(error);
  }

  refreshPage() {
    this.router.onSameUrlNavigation = 'reload';
  }

  decline() {
    this.modalRef.hide();
  }
}
