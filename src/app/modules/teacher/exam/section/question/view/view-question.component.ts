import { Component, OnInit, Injectable, TemplateRef } from '@angular/core';
import { ViewQuestionService } from './view-question.service';
import { ViewQuestionInitialData } from './view-question-request-response';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteResponse } from '../../view/view-section-request-response';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

/**
 * Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
}

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class ViewQuestionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  questionId = Number(this.activatedRoute.snapshot.paramMap.get('questionId'));
  initialData: ViewQuestionInitialData;
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  duration = [];
  modalRef: BsModalRef;
  message: string;
  subQuestion: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: BsModalService,
    private viewQuestionService: ViewQuestionService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewQuestionService.getInitialData(this.questionId).subscribe(
      (initialData: ViewQuestionInitialData) => {
        this.initialData = initialData;
        if (initialData.questionTransfer != null && initialData.questionTransfer.duration != null) {
          this.duration = initialData.questionTransfer.duration.split(':');
        }
        this.time.hour = parseInt(this.duration[0], 10);
        this.time.minute = parseInt(this.duration[1], 10);
        this.time.second = parseInt(this.duration[2], 10);
      }
    );
  }

  viewSectionSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  deleteQuestionConfirmation(template: TemplateRef<any>, questionId, subQuestion) {
    this.questionId = questionId;
    this.subQuestion = subQuestion;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteQuestionConfirmed() {
    this.viewQuestionService.deleteQuestion(this.questionId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/section/question/question_deleted';
          this.modalRef.hide();
          if (this.subQuestion) {
            this.navigateBack();
          } else {
            this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section', this.sectionId, this.sectionName, 'view']);
          }
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
