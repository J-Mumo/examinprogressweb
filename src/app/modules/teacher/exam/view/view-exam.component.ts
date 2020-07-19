import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewExamService } from './view-exam.service';
import { ViewExamInitialData } from './view-exam-request-response';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.scss']
})
export class ViewExamComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  initialData: ViewExamInitialData;
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  duration = [];

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
        this.duration = initialData.duration !== null ? initialData.duration.split(':') : [];
        this.time.hour = parseInt(this.duration[0], 10);
        this.time.minute = parseInt(this.duration[1], 10);
        this.time.second = parseInt(this.duration[2], 10);
      }
    );
  }
}
