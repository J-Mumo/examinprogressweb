import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  AddMultipleChoiceQuestionAnswerRequest, AddQuestionRequest, SaveResponse
} from './add-question-request-response';
import { AddQuestionService } from './add-question.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  addMultipleChoiceQuestionAnswerRequests: AddMultipleChoiceQuestionAnswerRequest[] = [];
  correctAnswerRequest: AddMultipleChoiceQuestionAnswerRequest;
  multipleChoiceCorrectAnswersRequests: AddMultipleChoiceQuestionAnswerRequest[] = [];
  message: string;
  goToSectionView: boolean;
  questionType;
  answerType;
  question: string;
  score: number;

  @ViewChild('addQuestion')
  addQuestionForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private addQuestionService: AddQuestionService,
  ) {}

  ngOnInit(): void {
    this.addMultipleChoiceQuestionAnswerRequests.push(new AddMultipleChoiceQuestionAnswerRequest('', false));
    this.addMultipleChoiceQuestionAnswerRequests.push(new AddMultipleChoiceQuestionAnswerRequest('', false));
  }

  printquestionType() {
    console.log(this.questionType);
  }

  public trackByFn(index, item) {
    if (!item) { return null; }
    return index;
  }

  addAnswer() {
    if (this.addMultipleChoiceQuestionAnswerRequests.length < 20) {
      this.addMultipleChoiceQuestionAnswerRequests.push({ answerText: '', correct: false });
    }
  }

  deleteAnswer(answer) {
    const i = this.addMultipleChoiceQuestionAnswerRequests.indexOf(answer);
    if (i !== -1) {
      this.addMultipleChoiceQuestionAnswerRequests.splice(i, 1 );
    }
  }

  getSingleCheckedAnswer(answerRequest: AddMultipleChoiceQuestionAnswerRequest) {
    this.correctAnswerRequest = answerRequest;
    this.correctAnswerRequest.correct = true;
  }

  getMultipleCheckedAnswer(event, answerRequest: AddMultipleChoiceQuestionAnswerRequest) {
    const checkBoxValue = event.checked;

    if (checkBoxValue) {
      this.multipleChoiceCorrectAnswersRequests.push(answerRequest);
    } else {
      this.multipleChoiceCorrectAnswersRequests.splice(this.multipleChoiceCorrectAnswersRequests.indexOf(answerRequest), 1);
    }
  }

  questionSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  saveAndExit(form: NgForm, stepper: MatStepper) {
    this.goToSectionView = true;
    this.onSubmitAnswers(form, stepper);
  }

  saveTextAnswerAndExit(stepper: MatStepper) {
    this.goToSectionView = true;
    this.onSubmitTextAnswer(stepper);
  }

  onSubmitQuestion(form: NgForm, stepper: MatStepper) {
    const question = form.value.question;
    const score = form.value.score;

    if (!form.valid) {
      if (question === '') {
        document.getElementById('question-error').hidden = false;
      } else { document.getElementById('question-error').hidden = true; }

      if (score === '') {
        document.getElementById('score-error').hidden = false;
      } else { document.getElementById('score-error').hidden = true; }

    } else {
      this.question = question;
      this.score = score;
      stepper.next();
    }
  }

  onSubmitAnswers(form: NgForm, stepper: MatStepper) {
    this.addMultipleChoiceQuestionAnswerRequests = [];
    for ( let i = 0; i < 20; i++ ) {
      const formAnswer = 'answer_' + i;
      const answer = form.value[formAnswer];
      const correct = false;

      /** Filter nulls */
      if ( answer !== null && answer !== undefined && answer !== '' ) {
        this.addMultipleChoiceQuestionAnswerRequests.push(new AddMultipleChoiceQuestionAnswerRequest(answer, correct));
      }
    }

    let counter = 0;
    for (const answerRequest of this.addMultipleChoiceQuestionAnswerRequests) {
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

      if (this.correctAnswerRequest === undefined && this.multipleChoiceCorrectAnswersRequests.length < 1) {
        document.getElementById('no-correct-answer-error').hidden = false;
      } else {
        document.getElementById('no-correct-answer-error').hidden = true;

        for (const answerRequest of this.addMultipleChoiceQuestionAnswerRequests) {
          if (this.answerType === 'multipleChoiceSingleAnswer') {
            if (answerRequest.answerText === this.correctAnswerRequest.answerText) {
              answerRequest.correct = true;
              break;
            }
          } else if (this.answerType === 'multipleChoiceMultipleAnswers') {

            for (const correctAnswer of this.multipleChoiceCorrectAnswersRequests) {
              if (answerRequest.answerText === correctAnswer.answerText) {
                answerRequest.correct = true;
              }
            }
          }
        }

        if (this.questionType === undefined) {
          this.message = 'teacher/exam/section/question/no_question_type';
          this.questionSnackBar(this.message);
          stepper.reset();
        } else if (this.question === undefined || this.question === '') {
          this.message = 'teacher/exam/section/question/no_question';
          this.questionSnackBar(this.message);
          stepper.previous();
          stepper.previous();
        } else {
          const addQuestionRequest: AddQuestionRequest = new AddQuestionRequest(
            this.sectionId, this.questionType, this.question, this.score, this.answerType, this.addMultipleChoiceQuestionAnswerRequests);

          this.addQuestionService.save(addQuestionRequest).subscribe(
            (response: SaveResponse) => {
              if (response.saved) {
                this.message = 'teacher/exam/section/question/question_saved_successfully';
                if (this.goToSectionView) {
                  this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section',
                    this.sectionId, this.sectionName, 'view' ]);
                } else {
                  form.reset();
                  this.addQuestionForm.reset();
                  stepper.reset();
                }
              } else {
                this.message = 'teacher/exam/section/question/question_not_saved';
              }
              this.questionSnackBar(this.message);
            }
          );
        }
      }
    }
  }

  onSubmitTextAnswer(stepper: MatStepper) {
    if (this.questionType === undefined) {
      this.message = 'teacher/exam/section/question/no_question_type';
      this.questionSnackBar(this.message);
      stepper.reset();
    } else if (this.question === undefined || this.question === '') {
      this.message = 'teacher/exam/section/question/no_question';
      this.questionSnackBar(this.message);
      stepper.previous();
      stepper.previous();
    } else {
      const addQuestionRequest: AddQuestionRequest = new AddQuestionRequest(
        this.sectionId, this.questionType, this.question, this.score, this.answerType, this.addMultipleChoiceQuestionAnswerRequests);

      this.addQuestionService.save(addQuestionRequest).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/section/question/question_saved_successfully';
            if (this.goToSectionView) {
              this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section',
                this.sectionId, this.sectionName, 'view' ]);
            } else {
              this.addQuestionForm.reset();
              stepper.reset();
            }
          } else {
            this.message = 'teacher/exam/section/question/question_not_saved';
          }
          this.questionSnackBar(this.message);
        }
      );
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
