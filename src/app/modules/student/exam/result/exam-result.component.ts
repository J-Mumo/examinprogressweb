import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ViewPerformanceInitialData, SectionResult } from './exam-result-request-response';
import { ExamResultService } from './exam-result.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {
  examTokenId = Number(this.activatedRoute.snapshot.paramMap.get('examTokenId'));
  initialData: ViewPerformanceInitialData;
  sectionResults: MatTableDataSource<SectionResult>;
  sectionResultsColumns: string[] = ['sectionName', 'percentScore', 'points', 'viewSectionPerformance'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private examResultService: ExamResultService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.examResultService.getInitialData(this.examTokenId).subscribe(
      (initialData: ViewPerformanceInitialData) => {
        this.initialData = initialData;
        this.sectionResults = new MatTableDataSource(initialData.examResult.sectionResults);
      }
    );
  }
}
