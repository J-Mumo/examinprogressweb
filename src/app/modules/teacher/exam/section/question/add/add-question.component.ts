import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddMultipleChoiceQuestionAnswerRequest, AddQuestionRequest, SaveResponse, QuestionRequest,
  AddComprehensionQuestionRequest, SaveResponseWithId, AddQuestionInitialData, AnswerTypeEnum
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
  initialData: AddQuestionInitialData;
  comprehensionQuestionId = null;
  message: string;
  addQuestionForComprehension: boolean;
  goToSectionView: boolean;
  questionType;
  answerType;
  comprehension: string;
  questionDuration;
  question: string;
  score: number;

  @ViewChild('addQuestion')
  addQuestionForm: NgForm;

  @ViewChild('addComprehension')
  addComprehensionQuestionForm: NgForm;

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
    this.getInitialData();
  }

  getInitialData() {
    this.addQuestionService.getInitialData(this.sectionId).subscribe(
      (initialData: AddQuestionInitialData) => {
        this.initialData = initialData;
      }
    );
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

  saveAndAddQuestionForComprehension(form: NgForm, stepper: MatStepper) {
    this.addQuestionForComprehension = true;
    if (this.answerType === 'textAnswer') {
      this.onSubmitTextAnswer(stepper);
    } else {
      this.onSubmitAnswers(form, stepper);
    }
  }

  saveAndAddNewQuestion(form: NgForm, stepper: MatStepper) {
    this.addQuestionForComprehension = false;
    if (this.answerType === 'textAnswer') {
      this.onSubmitTextAnswer(stepper);
    } else {
      this.onSubmitAnswers(form, stepper);
    }
  }

  saveTextAnswerAndExit(stepper: MatStepper) {
    this.goToSectionView = true;
    this.onSubmitTextAnswer(stepper);
  }

  onSubmitQuestion(form: NgForm, stepper: MatStepper) {
    const question = form.value.question;
    const score = form.value.score;
    const questionDuration = form.value.duration !== undefined ? form.value.duration : null;

    if (!form.valid) {
      if (question === '') {
        document.getElementById('question-error').hidden = false;
      } else { document.getElementById('question-error').hidden = true; }

      if (score === '' || score === null) {
        document.getElementById('score-error').hidden = false;
      } else { document.getElementById('score-error').hidden = true; }

      if (questionDuration === '' || questionDuration === null) {
        document.getElementById('duration-error').hidden = false;
      } else { document.getElementById('duration-error').hidden = true; }

    } else {
      this.question = question;
      this.score = score;
      this.questionDuration = questionDuration;
      stepper.next();
    }
  }

  onSubmitComprehension(form: NgForm, stepper: MatStepper) {
    const comprehension = form.value.comprehension;
    const questionDuration = form.value.duration !== undefined ? form.value.duration : null;

    if (!form.valid) {
      if (comprehension === '') {
        document.getElementById('comprehension-error').hidden = false;
      } else { document.getElementById('comprehension-error').hidden = true; }

      if (questionDuration === '' || questionDuration === null) {
        document.getElementById('duration-error').hidden = false;
      } else { document.getElementById('duration-error').hidden = true; }

    } else {
      this.comprehension = comprehension;
      this.questionDuration = questionDuration;
      stepper.next();
    }
  }

  onSubmitAnswers(form: NgForm, stepper: MatStepper) {
    let answerTypeId;
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
            answerTypeId = AnswerTypeEnum.multipleChoiceSingleAnswerId;
            if (answerRequest.answerText === this.correctAnswerRequest.answerText) {
              answerRequest.correct = true;
              break;
            }
          } else if (this.answerType === 'multipleChoiceMultipleAnswers') {

            answerTypeId = AnswerTypeEnum.multipleChoiceMultipleAnswersId;
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
        } else if (this.question === undefined || this.question === '' || this.score === undefined || this.score === null) {
          this.message = 'teacher/exam/section/question/no_question';
          this.questionSnackBar(this.message);
          stepper.previous();
          stepper.previous();
        } else {

          const duration = this.questionDuration != null ?
            'PT' + this.questionDuration.hour + 'H' + this.questionDuration.minute + 'M' + this.questionDuration.second + 'S' : null;

          if (this.questionType === 'question') {
            const addQuestionRequest: AddQuestionRequest = new AddQuestionRequest(
              this.sectionId, answerTypeId, this.question, this.score, duration, this.addMultipleChoiceQuestionAnswerRequests);

            this.addquestionService(addQuestionRequest, stepper, form);
          } else if (this.questionType === 'comprehensionQuestion') {
            const questionRequest: QuestionRequest = new QuestionRequest(
              this.question, this.score, this.addMultipleChoiceQuestionAnswerRequests);

            const addComprehensionQuestionRequest: AddComprehensionQuestionRequest = new AddComprehensionQuestionRequest(
              this.sectionId, this.comprehensionQuestionId, answerTypeId, this.comprehension, duration, questionRequest);

            this.addcomprehensionQuestionService(addComprehensionQuestionRequest, stepper, form);
          }
        }
      }
    }
  }

  onSubmitTextAnswer(stepper: MatStepper) {
    const form: NgForm = new NgForm(null, null);
    const answerTypeId = AnswerTypeEnum.textAnswerId;

    if (this.questionType === undefined) {
      this.message = 'teacher/exam/section/question/no_question_type';
      this.questionSnackBar(this.message);
      stepper.reset();
    } else if (this.question === undefined || this.question === '' || this.score === undefined || this.score === null) {
      this.message = 'teacher/exam/section/question/no_question_score';
      this.questionSnackBar(this.message);
      stepper.previous();
      stepper.previous();
    } else {

      const duration = this.questionDuration != null ?
      'PT' + this.questionDuration.hour + 'H' + this.questionDuration.minute + 'M' + this.questionDuration.second + 'S' : null;

      if (this.questionType === 'question') {
        const addQuestionRequest: AddQuestionRequest = new AddQuestionRequest(
          this.sectionId, answerTypeId, this.question, this.score, duration, this.addMultipleChoiceQuestionAnswerRequests);

        this.addquestionService(addQuestionRequest, stepper, form);
      } else if (this.questionType === 'comprehensionQuestion') {
        const questionRequest: QuestionRequest = new QuestionRequest(
          this.question, this.score, this.addMultipleChoiceQuestionAnswerRequests);

        const addComprehensionQuestionRequest: AddComprehensionQuestionRequest = new AddComprehensionQuestionRequest(
          this.sectionId, this.comprehensionQuestionId, answerTypeId, this.comprehension, duration, questionRequest);

        this.addcomprehensionQuestionService(addComprehensionQuestionRequest, stepper, form);
      }
    }
  }

  addquestionService(addQuestionRequest: AddQuestionRequest, stepper: MatStepper, form: NgForm) {

    this.addQuestionService.saveQuestion(addQuestionRequest).subscribe(
      (response: SaveResponse) => {
        if (response.saved) {
          this.message = 'teacher/exam/section/question/question_saved_successfully';
          if (this.goToSectionView) {
            this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section',
              this.sectionId, this.sectionName, 'view' ]);
          } else {
            this.addQuestionForm.reset();
            form.reset();
            stepper.reset();
            this.questionType = undefined;
            this.answerType = undefined;
            this.correctAnswerRequest = undefined;
            this.multipleChoiceCorrectAnswersRequests = [];
            this.addMultipleChoiceQuestionAnswerRequests = [];
          }
        } else {
          this.message = 'teacher/exam/section/question/question_not_saved';
        }
        this.questionSnackBar(this.message);
      }
    );
  }

  addcomprehensionQuestionService(addComprehensionQuestionRequest: AddComprehensionQuestionRequest, stepper: MatStepper, form: NgForm) {

    this.addQuestionService.saveComprehensionQuestion(addComprehensionQuestionRequest).subscribe(
      (response: SaveResponseWithId) => {
        if (response.saved) {
          this.message = 'teacher/exam/section/question/question_saved_successfully';
          if (this.goToSectionView) {
            this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section',
              this.sectionId, this.sectionName, 'view' ]);
          } else if (this.addQuestionForComprehension) {
            this.comprehensionQuestionId = response.id;
            this.addQuestionForm.reset();
            form.reset();
            stepper.previous();
          } else {
            this.addComprehensionQuestionForm.reset();
            form.reset();
            stepper.reset();
            this.questionType = undefined;
            this.comprehensionQuestionId = null;
          }

          this.answerType = undefined;
          this.correctAnswerRequest = undefined;
          this.multipleChoiceCorrectAnswersRequests = [];
          this.addMultipleChoiceQuestionAnswerRequests = [];
        } else {
          this.message = 'teacher/exam/section/question/question_not_saved';
        }
        this.questionSnackBar(this.message);
      }
    );
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
