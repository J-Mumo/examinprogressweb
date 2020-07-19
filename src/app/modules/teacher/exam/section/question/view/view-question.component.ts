import { Component, OnInit, Injectable } from '@angular/core';
import { ViewQuestionService } from './view-question.service';
import { ViewQuestionInitialData } from './view-question-request-response';
import { ActivatedRoute } from '@angular/router';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

/**
 * Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
}

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class ViewQuestionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  questionId = Number(this.activatedRoute.snapshot.paramMap.get('questionId'));
  initialData: ViewQuestionInitialData;
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  duration = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewQuestionService: ViewQuestionService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewQuestionService.getInitialData(this.questionId).subscribe(
      (initialData: ViewQuestionInitialData) => {
        this.initialData = initialData;
        if (initialData.comprehensionQuestion) {
          this.duration = initialData.comprehensionQuestionTransfer.duration.split( ':' );
        } else if (initialData.questionTransfer.duration != null) {
          this.duration = initialData.questionTransfer.duration.split(':');
        }
        this.time.hour = parseInt(this.duration[0], 10);
        this.time.minute = parseInt(this.duration[1], 10);
        this.time.second = parseInt(this.duration[2], 10);
      }
    );
  }
}
