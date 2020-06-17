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
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  initialData: ViewExamInitialData;
  startDate: Date;
  examInProgress: boolean;
  pastExam: boolean;
  futureExam: boolean;
  hours;
  minutes;

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
        const date = initialData.startTime.toString();
        const hrs = initialData.duration.substr(0, initialData.duration.indexOf(':'));
        const mins = initialData.duration.split(':')[1];
        this.hours = parseInt(hrs, 10);
        this.minutes = parseInt(mins, 10);
        this.startDate = new Date(date);
        const today = new Date();
        if (today < this.startDate) {
          this.pastExam = true;
        }
      }
    );
  }
}
