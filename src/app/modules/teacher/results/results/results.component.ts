import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ResultsInitialData, StudentExamResult } from './results-request-response';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  initialData: ResultsInitialData;
  results: MatTableDataSource<StudentExamResult>;
  resultsColumns: string[] = ['name', 'currentScore', 'status'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private resultsService: ResultsService
    ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.resultsService.getInitialData(this.examId).subscribe(
      (initialData: ResultsInitialData) => {
        this.initialData = initialData;
        this.results = new MatTableDataSource(initialData.studentExamResults);
      }
    );
  }

  applyExamFilter(filterValue: string) {
    this.results.filter = filterValue.trim().toLowerCase();
  }
}
