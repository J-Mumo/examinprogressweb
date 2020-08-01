import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewExamService } from './view-exam.service';
import { ViewExamInitialData, DeleteResponse } from './view-exam-request-response';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.scss']
})
export class ViewExamComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  initialData: ViewExamInitialData;
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  duration = [];
  sectionId: number;
  modalRef: BsModalRef;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: BsModalService,
    private viewExamService: ViewExamService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewExamService.getInitialData(this.examId).subscribe(
      (initialData: ViewExamInitialData) => {
        this.initialData = initialData;
        this.duration = initialData.duration !== null ? initialData.duration.split(':') : [];
        this.time.hour = parseInt(this.duration[0], 10);
        this.time.minute = parseInt(this.duration[1], 10);
        this.time.second = parseInt(this.duration[2], 10);
      }
    );
  }

  viewExamSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  deleteExamConfirmation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteExamConfirmed() {
    this.viewExamService.deleteExam(this.examId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/exam_deleted';
          this.modalRef.hide();
          this.router.navigate(['/teacher/exams']);
        } else {
          this.message = 'teacher/exam/section/section_not_deleted';
          this.modalRef.hide();
        }
        this.viewExamSnackBar(this.message);
      }
    );
  }

  deleteSectionConfirmation(template: TemplateRef<any>, sectionId: number) {
    this.sectionId = sectionId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteSectionConfirmed() {
    this.viewExamService.deleteSection(this.sectionId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/section/section_deleted';
          this.modalRef.hide();
          this.navigateBack();
        } else {
          this.message = 'teacher/exam/section/section_not_deleted';
          this.modalRef.hide();
        }
        this.viewExamSnackBar(this.message);
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
