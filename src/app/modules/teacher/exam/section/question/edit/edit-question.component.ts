import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditQuestionService } from './edit-question.service';
import {
  EditQuestionInitialData, MultipleChoiceAnswerTransfer, MultipleChoiceQuestionAnswerRequest, EditQuestionRequest,
  SaveResponseWithId
} from './edit-question-request-response';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class EditQuestionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  questionId = Number(this.activatedRoute.snapshot.paramMap.get('questionId'));
  initialData: EditQuestionInitialData;
  multipleChoiceQuestionAnswerRequests: MultipleChoiceQuestionAnswerRequest[] = [];
  multipleChoiceCorrectAnswersRequests: MultipleChoiceQuestionAnswerRequest[] = [];
  correctAnswer: MultipleChoiceAnswerTransfer;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private editQuestionService: EditQuestionService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.editQuestionService.getInitialData(this.questionId).subscribe(
      (initialData: EditQuestionInitialData) => {
        this.initialData = initialData;

        if (initialData.answerType === 'Multiple choice single answer') {
          for (const answer of initialData.multipleChoiceAnswerTransfers) {
            if (answer.correct) {
              this.correctAnswer = answer;
            }
          }
        } else if (this.initialData.answerType === 'Multiple choice multiple answers') {
          for (const answer of initialData.multipleChoiceAnswerTransfers) {
            if (answer.correct) {
              this.multipleChoiceCorrectAnswersRequests.push(answer);
            }
          }
        }
      }
    );
  }

  getSingleCheckedAnswer(answer) {
    this.correctAnswer = answer;
  }

  getMultipleCheckedAnswer(event, answer) {
    const checkBoxValue = event.checked;

    if (checkBoxValue) {
      this.multipleChoiceCorrectAnswersRequests.push(answer);
    } else {
      this.multipleChoiceCorrectAnswersRequests.splice(this.multipleChoiceCorrectAnswersRequests.indexOf(answer), 1);
    }
  }

  public trackByFn(index, item) {
    if (!item) { return null; }
    return index;
  }

  addAnswer() {
    if (this.initialData.multipleChoiceAnswerTransfers.length < 20) {
      this.initialData.multipleChoiceAnswerTransfers.push({ answerText: '', correct: false });
    }
  }

  deleteAnswer(answer) {
    const i = this.initialData.multipleChoiceAnswerTransfers.indexOf(answer);
    if (i !== -1) {
      this.initialData.multipleChoiceAnswerTransfers.splice(i, 1 );
    }
  }

  onSubmit(form: NgForm) {
    const question = form.value.question;
    const score = form.value.score;
    let duration = null;
    if (!this.initialData.comprehensionSubQuestion || !this.initialData.comprehensionQuestion) {
      duration = form.value.duration;
    }
    this.multipleChoiceQuestionAnswerRequests = [];
    let questionWithTextAnswer = false;
    if (this.initialData.answerType === 'Text answer') {
      questionWithTextAnswer = true;
    }

    for ( let i = 0; i < 20; i++ ) {
      const formAnswer = 'answer_' + i;
      const answer = form.value[formAnswer];
      const correct = false;

      /** Filter nulls */
      if ( answer !== null && answer !== undefined && answer !== '' ) {
        this.multipleChoiceQuestionAnswerRequests.push(new MultipleChoiceQuestionAnswerRequest(answer, correct));
      }
    }

    if (!form.valid) {
      if (question === '') {
        document.getElementById('question-error').hidden = false;
      } else { document.getElementById('question-error').hidden = true; }

      if (score === '' || score === null || isNaN(parseInt(score.trim(), 10))) {
        document.getElementById('score-error').hidden = false;
      } else { document.getElementById('score-error').hidden = true; }

      if (!this.initialData.comprehensionSubQuestion) {
        if (duration === '' || duration === null) {
          document.getElementById('duration-error').hidden = false;
        } else { document.getElementById('duration-error').hidden = true; }
      }

    } else {
      if (questionWithTextAnswer) {
        this.saveQuestionWithTextAnswer(question, score, duration);
      } else {
        this.saveQuestionWithMultipleChoices(question, score, duration);
      }
    }
  }

  saveQuestionWithTextAnswer(question, score, duration) {
    this.multipleChoiceQuestionAnswerRequests = [];
    const request: EditQuestionRequest = new EditQuestionRequest(
      this.questionId, question, score, duration, this.initialData.answerType, this.multipleChoiceQuestionAnswerRequests);

    this.saveEditedQuestion(request);
  }

  saveQuestionWithMultipleChoices(question, score, duration) {
    let counter = 0;
    for (const answerRequest of this.multipleChoiceQuestionAnswerRequests) {
      if (answerRequest.answerText !== '') {
        counter++;
      } else if (counter > 2) {
        break;
      }
    }
    if (counter < 2) {
      document.getElementById('less-answers-error').hidden = false;
    } else {

      document.getElementById('less-answers-error').hidden = true;

      if (this.correctAnswer === undefined && this.multipleChoiceQuestionAnswerRequests.length < 1) {
        document.getElementById('no-correct-answer-error').hidden = false;
      } else {
        document.getElementById('no-correct-answer-error').hidden = true;

        for (const answerRequest of this.multipleChoiceQuestionAnswerRequests) {
          if (this.initialData.answerType === 'Multiple choice single answer') {
            if (answerRequest.answerText === this.correctAnswer.answerText) {
              answerRequest.correct = true;
              break;
            }
          } else if (this.initialData.answerType === 'Multiple choice multiple answers') {

            for (const correctAnswer of this.multipleChoiceCorrectAnswersRequests) {
              if (answerRequest.answerText === correctAnswer.answerText) {
                console.log('true');
                answerRequest.correct = true;
              }
            }
          }
        }

        const request: EditQuestionRequest = new EditQuestionRequest(
          this.questionId, question, score, duration, this.initialData.answerType, this.multipleChoiceQuestionAnswerRequests);

        this.saveEditedQuestion(request);
      }
    }
  }

  saveEditedQuestion(request: EditQuestionRequest) {
    this.editQuestionService.save(request).subscribe(
      (response: SaveResponseWithId) => {
        if (response.saved) {
          this.message = 'teacher/exam/section/question/question_saved_successfully';
          this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section',
            this.sectionId, this.sectionName, 'question', response.id, 'view']);
        } else {
          this.message = 'teacher/exam/section/question/question_not_saved';
        }
        this.questionSnackBar(this.message);
      }
    );
  }

  questionSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }
}
