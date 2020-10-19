import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SectionResult, ViewPerformanceInitialData, ViewPerformanceRequestInitialData } from './view-performance-request-response';
import { ViewPerformanceService } from './view-performance.service';

@Component({
  selector: 'app-view-performance',
  templateUrl: './view-performance.component.html',
  styleUrls: ['./view-performance.component.scss']
})
export class ViewPerformanceComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  studentId = Number(this.activatedRoute.snapshot.paramMap.get('studentId'));
  initialData: ViewPerformanceInitialData;
  sectionResults: MatTableDataSource<SectionResult>;
  sectionResultsColumns: string[] = ['sectionName', 'percentScore', 'points', 'viewSectionPerformance'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewPerformanceService: ViewPerformanceService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    const request: ViewPerformanceRequestInitialData = new ViewPerformanceRequestInitialData(
      this.studentId, this.examId
    );
    this.viewPerformanceService.getInitialData(request).subscribe(
      (initialData: ViewPerformanceInitialData) => {
        this.initialData = initialData;
        this.sectionResults = new MatTableDataSource(initialData.examResult.sectionResults);
      }
    );
  }
}
