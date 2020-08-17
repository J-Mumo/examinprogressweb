import { Component, OnInit } from '@angular/core';
import { ExaminprogressResponse, AnswerRequest, SkipQuestionRequest } from './examinprogress-request-response';
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
  answerIds: number[] = [];
  answerText: string;
  config = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '10rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'underline',
        'strikeThrough',
        'subscript',
        'superscript', ,
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
      ],
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

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
    const request: SkipQuestionRequest = new SkipQuestionRequest(this.examTokenId,
      this.response.examSectionTransfer.examQuestionTransfer.questionId);

    this.examinprogressService.skipQuestion(request).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        this.answerIds = [];
      }
    );
  }

  onSubmit(form: NgForm) {
    const questionId = this.response.examSectionTransfer.examQuestionTransfer.questionTransfer != null ?
      this.response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionId :
      this.response.examSectionTransfer.examQuestionTransfer.questionId;

    const request: AnswerRequest = new AnswerRequest(this.examTokenId,questionId, this.answerIds, this.answerText);

    this.examinprogressService.saveAnswer(request).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        this.answerIds = [];
      }
    );
  }
}
