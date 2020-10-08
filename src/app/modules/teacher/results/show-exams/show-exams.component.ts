import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExamTransfer } from '../../exam/exams/exams-request-response';
import { ShowExamsInitialData } from './show-exams-request-response';
import { ShowExamsService } from './show-exams.service';

@Component({
  selector: 'app-show-exams',
  templateUrl: './show-exams.component.html',
  styleUrls: ['./show-exams.component.scss']
})
export class ShowExamsComponent implements OnInit {
  initialData: ShowExamsInitialData;
  exams: MatTableDataSource<ExamTransfer>;
  examsColumns: string[] = ['name', 'description', 'viewExam', 'actions'];

  constructor(
    private showExamsService: ShowExamsService) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.showExamsService.getInitialData().subscribe(
      (initialData: ShowExamsInitialData) => {
        this.initialData = initialData;
        this.exams = new MatTableDataSource(initialData.examTransfers);
      }
    );
  }

  applyExamFilter(filterValue: string) {
    this.exams.filter = filterValue.trim().toLowerCase();
  }

}
