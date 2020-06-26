import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AddMultipleChoiceQuestionAnswerRequest, AddQuestionRequest, SaveResponse
} from './add-question-request-response';
import { AddQuestionService } from './add-question.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  message: string;
  goToSectionView: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private addQuestionService: AddQuestionService
  ) { }

  ngOnInit(): void {
    this.addMultipleChoiceQuestionAnswerRequests.push(new AddMultipleChoiceQuestionAnswerRequest('', false));
    this.addMultipleChoiceQuestionAnswerRequests.push(new AddMultipleChoiceQuestionAnswerRequest('', false));
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

  getCheckedAnswer(answerRequest: AddMultipleChoiceQuestionAnswerRequest) {
    this.correctAnswerRequest = answerRequest;
    this.correctAnswerRequest.correct = true;
  }

  questionSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  saveAndExit() {
    this.goToSectionView = true;
  }

  onSubmit(form: NgForm) {
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

        if (!this.correctAnswerRequest.correct) {
          document.getElementById('no-correct-answer-error').hidden = false;
        } else {
          document.getElementById('no-correct-answer-error').hidden = true;

          for (const answerRequest of this.addMultipleChoiceQuestionAnswerRequests) {
            if (answerRequest.answerText === this.correctAnswerRequest.answerText) {
              answerRequest.correct = true;
              break;
            }
          }

          const addQuestionRequest: AddQuestionRequest = new AddQuestionRequest(
            this.sectionId, question, score, this.addMultipleChoiceQuestionAnswerRequests);

          this.addQuestionService.save(addQuestionRequest).subscribe(
            (response: SaveResponse) => {
              if (response.saved) {
                this.message = 'teacher/exam/section/question/question_saved_successfully';
                if (this.goToSectionView) {

                } else {
                  form.reset();
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

  scroll(el) {
    el.scrollIntoView();
  }
}
