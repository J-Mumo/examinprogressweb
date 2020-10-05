import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExamsService } from './exams.service';
import { ExamsInitialData, ExamTransfer, DeleteResponse } from './exams-request-response';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  initialData: ExamsInitialData;
  exams: MatTableDataSource<ExamTransfer>;
  examsColumns: string[] = ['name', 'description', 'viewExam', 'actions'];
  examId: number;
  modalRef: BsModalRef;
  message: string;

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: BsModalService,
    private examsService: ExamsService
  ) { }

  ngOnInit(): void {
    // this.getInitialData();
  }

  getInitialData() {
    this.examsService.getInitialData().subscribe(
      (initialData: ExamsInitialData) => {
        this.initialData = initialData;
        this.exams = new MatTableDataSource(initialData.examTransfers);
      }
    );
  }

  applyExamFilter(filterValue: string) {
    this.exams.filter = filterValue.trim().toLowerCase();
  }

  examsSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  deleteExamConfirmation(template: TemplateRef<any>, examId: number) {
    this.examId = examId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteExamConfirmed() {
    this.examsService.deleteExam(this.examId).subscribe(
      (response: DeleteResponse) => {
        if (response.deleted) {
          this.message = 'teacher/exam/exam_deleted';
          this.modalRef.hide();
          this.navigateBack();
        } else {
          this.message = 'teacher/exam/section/section_not_deleted';
          this.modalRef.hide();
        }
        this.examsSnackBar(this.message);
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
