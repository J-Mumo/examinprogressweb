import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ExaminprogressResponse, AnswerRequest, SkipQuestionRequest, SkipSectionRequest } from './examinprogress-request-response';
import { ExaminprogressService } from './examinprogress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';

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
  timeLeftInSeconds = null;
  pause = false;
  @ViewChild('countDown', { static: false }) countDown: CountdownComponent;
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
    private router: Router,
    private examinprogressService: ExaminprogressService
  ) { }

  ngOnInit(): void {
    this.getExamProgress();
  }

  getExamProgress() {
    this.examinprogressService.getExamProgress(this.examTokenId).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        this.pause = false;
        if (!response.examComplete) {
          if (response.timedPerExam) {
            this.timeLeftInSeconds = response.examTime;
          } else if (response.timedPerSection) {
            this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
          } else if (response.timedPerQuestion) {
            if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
            } else {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
            }
          }
          // this.countDown.begin();
          // this.countDown.left = this.timeLeftInSeconds;
        }
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

  onQuestionTimerExpired(event) {
    if (event.action === 'done') {
      this.skipToNextQuestion();
    }
  }

  onSectionTimerExpired(event) {
    if (event.action === 'done') {
      this.skipToNextSection();
    }
  }

  pauseExam() {
    this.pause = true;
  }

  skipToNextQuestion() {
    if (this.response !== undefined) {
      const questionId = this.response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion ?
      this.response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionId :
      this.response.examSectionTransfer.examQuestionTransfer.questionId;
      const request: SkipQuestionRequest = new SkipQuestionRequest(this.examTokenId, questionId, this.pause);
      this.examinprogressService.skipQuestion(request).subscribe(
        (response: ExaminprogressResponse) => {
          this.response = response;
          this.answerIds = [];
          if (response.paused) {
            this.router.navigate(['/student/exams']);
          } else {
            if (!response.examComplete) {
              if (response.timedPerExam) {
                this.timeLeftInSeconds = response.examTime;
              } else if (response.timedPerSection) {
                this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
              } else if (response.timedPerQuestion) {
                if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
                } else {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
                }
              }
              this.countDown.left = this.timeLeftInSeconds;
              this.countDown.restart();
            }
          }
        }
      );
    }
  }

  skipToNextSection() {
    if (this.response !== undefined) {
      const sectionId = this.response.examSectionTransfer.sectionId;
      const request: SkipSectionRequest = new SkipSectionRequest(this.examTokenId, sectionId, this.pause);
      this.examinprogressService.skipSection(request).subscribe(
        (response: ExaminprogressResponse) => {
          this.response = response;
          if (response.paused) {
            this.router.navigate(['/student/exams']);
          } else {
            if (!response.examComplete) {
              if (response.timedPerExam) {
                this.timeLeftInSeconds = response.examTime;
              } else if (response.timedPerSection) {
                this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
              } else if (response.timedPerQuestion) {
                if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
                } else {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
                }
              }
              this.countDown.left = this.timeLeftInSeconds;
              this.countDown.restart();
            }
          }
        }
      );
    }
  }

  terminateExam(event) {
    if (event.action === 'done' && this.response !== undefined) {
      this.examinprogressService.terminateExam(this.examTokenId).subscribe(
        (response: ExaminprogressResponse) => {
          this.response = response;
          this.router.navigate(['/student/exams']);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    const questionId = this.response.examSectionTransfer.examQuestionTransfer.questionTransfer != null ?
      this.response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionId :
      this.response.examSectionTransfer.examQuestionTransfer.questionId;

    const request: AnswerRequest = new AnswerRequest(this.examTokenId, this.pause, questionId, this.answerIds, this.answerText);

    this.examinprogressService.saveAnswer(request).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        this.answerIds = [];
        if (!response.examComplete) {
          if (response.timedPerExam) {
            this.timeLeftInSeconds = response.examTime;
          } else if (response.timedPerSection) {
            this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
          } else if (response.timedPerQuestion) {
            if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
            } else {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
            }
          }
        }
      }
    );
  }
}
