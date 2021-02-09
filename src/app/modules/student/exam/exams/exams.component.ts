import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExamsService } from './exams.service';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentExamsInitialData, StudentExamTransfer } from './exams-request-response';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  initialData: StudentExamsInitialData;
  exams: MatTableDataSource<StudentExamTransfer>;
  examsColumns: string[] = ['name', 'description', 'status', 'action'];
  examId: number;
  modalRef: BsModalRef;
  message: string;

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private examsService: ExamsService) {}

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.examsService.getInitialData().subscribe(
      (initialData: StudentExamsInitialData) => {
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
}
