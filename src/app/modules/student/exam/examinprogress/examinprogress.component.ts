import { Component, OnInit } from '@angular/core';
import { ExaminprogressResponse, MultipleChoiceAnswerRequest } from './examinprogress-request-response';
import { ExaminprogressService } from './examinprogress.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-examinprogress',
  templateUrl: './examinprogress.component.html',
  styleUrls: ['./examinprogress.component.scss']
})
export class ExaminprogressComponent implements OnInit {
  response: ExaminprogressResponse;
  examTokenId = Number(this.activatedRoute.snapshot.paramMap.get('examTokenId'));
  answerIds: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private examinprogressService: ExaminprogressService
  ) { }

  ngOnInit(): void {
    this.getExamProgress();
  }

  getExamProgress() {
    this.examinprogressService.getExamProgress(this.examTokenId).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
      }
    );
  }

  public trackByFn(index, item) {
    if (!item) { return null; }
    return index;
  }

  getSingleCheckedAnswer(answerId: number) {
    this.answerIds = [];
    this.answerIds.push(answerId);
  }

  getMultipleCheckedAnswer(event, answerId: number) {
    const checkBoxValue = event.checked;

    if (checkBoxValue) {
      this.answerIds.push(answerId);
    } else {
      this.answerIds.splice(this.answerIds.indexOf(answerId), 1);
    }
  }

  skipToNextQuestion() {

  }

  onSubmitMultipleChoice(form: NgForm) {
    const request: MultipleChoiceAnswerRequest = new MultipleChoiceAnswerRequest(this.examTokenId,
      this.response.examSectionTransfer.examQuestionTransfer.questionId, this.answerIds);

    this.examinprogressService.saveMultipleChoiceAnswer(request).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        console.log(response);
      }
    );
  }
}
