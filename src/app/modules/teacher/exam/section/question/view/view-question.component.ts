import { Component, OnInit } from '@angular/core';
import { ViewQuestionService } from './view-question.service';
import { ViewQuestionInitialData } from './view-question-request-response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  questionId = Number(this.activatedRoute.snapshot.paramMap.get('questionId'));
  initialData: ViewQuestionInitialData;

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
      }
    );
  }
}
