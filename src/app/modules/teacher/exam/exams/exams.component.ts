import { Component, OnInit } from '@angular/core';
import { ExamsService } from './exams.service';
import { ExamsInitialData, ExamTransfer } from './exams-request-response';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  initialData: ExamsInitialData;
  exams: MatTableDataSource<ExamTransfer>;
  examsColumns: string[] = ['name', 'description', 'viewExam', 'actions'];

  constructor(
    private examsService: ExamsService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
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
}
