import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewExamService } from './view-exam.service';
import { ViewExamInitialData } from './view-exam-request-response';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.scss']
})
export class ViewExamComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  initialData: ViewExamInitialData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewExamService: ViewExamService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewExamService.getInitialData(this.examId).subscribe(
      (initialData: ViewExamInitialData) => {
        this.initialData = initialData;
      }
    );
  }
}
