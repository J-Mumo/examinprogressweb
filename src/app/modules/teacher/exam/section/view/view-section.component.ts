import { Component, OnInit, TemplateRef } from '@angular/core';
import { ViewSectionService } from './view-section.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSectionInitialData, QuestionTransfer, DeleteResponse } from './view-section-request-response';
import { MatTableDataSource } from '@angular/material/table';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  initialData: ViewSectionInitialData;
  questions: MatTableDataSource<QuestionTransfer>;
  questionColumns: string[] = ['question', 'questionType', 'viewQuestion', 'actions'];
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  duration = [];
  questionId: number;
  modalRef: BsModalRef;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: BsModalService,
    private viewSectionService: ViewSectionService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewSectionService.getInitialData(this.sectionId).subscribe(
      (initialData: ViewSectionInitialData) => {
        this.initialData = initialData;
        this.questions = new MatTableDataSource(initialData.questionTransfers);
        this.duration = initialData.duration !== null ? initialData.duration.split(':') : [];
        this.time.hour = parseInt(this.duration[0], 10);
        this.time.minute = parseInt(this.duration[1], 10);
        this.time.second = parseInt(this.duration[2], 10);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.questions.filter = filterValue.trim().toLowerCase();
  }

  viewSectionSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  deleteSectionConfirmation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteSectionConfirmed() {
    this.viewSectionService.deleteSection(this.sectionId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/section/section_deleted';
          this.router.navigate(['/teacher/exam', this.examId, 'view']);
        } else {
          this.message = 'teacher/exam/section/section_not_deleted';
        }
        this.modalRef.hide();
        this.viewSectionSnackBar(this.message);
      }
    );
  }

  deleteQuestionConfirmation(template: TemplateRef<any>, questionId) {
    this.questionId = questionId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteQuestionConfirmed() {
    this.viewSectionService.deleteQuestion(this.questionId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/section/question/question_deleted';
          this.modalRef.hide();
          this.navigateBack();
        } else {
          this.message = 'teacher/exam/section/question/question_not_deleted';
          this.modalRef.hide();
        }
        this.viewSectionSnackBar(this.message);
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
