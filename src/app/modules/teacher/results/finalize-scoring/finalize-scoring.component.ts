import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EditExamRequest } from '../../exam/edit/edit-exam-request-response';
import { FinalizeScoringInitialData, FinalizeScoringRequest, FinalizeScoringRequestInitialData, SaveResponse } from './finalize-scoring-request-response';
import { FinalizeScoringService } from './finalize-scoring.service';

@Component({
  selector: 'app-finalize-scoring',
  templateUrl: './finalize-scoring.component.html',
  styleUrls: ['./finalize-scoring.component.scss']
})
export class FinalizeScoringComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  studentId = Number(this.activatedRoute.snapshot.paramMap.get('studentId'));
  initialData: FinalizeScoringInitialData;
  message: string;
  config = {
    editable: false,
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
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private finalizeScoringService: FinalizeScoringService
    ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    const request: FinalizeScoringRequestInitialData = new FinalizeScoringRequestInitialData(
      this.studentId, this.examId
    );

    this.finalizeScoringService.getInitialData(request).subscribe(
      (initialData: FinalizeScoringInitialData) => {
        this.initialData = initialData;
      }
    );
  }

  saveSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  onSubmit(form: NgForm) {
    const studentPoints = form.value.studentPoints;

    if (!form.valid) {
      if (studentPoints === '' || studentPoints === null) {
        document.getElementById('studentPoints-error').hidden = false;
      } else { document.getElementById('studentPoints-error').hidden = true; }

    } else {

      const maxPoints = this.initialData.finalizeScore.questionMaxPoints;

      if (studentPoints > maxPoints) {
        document.getElementById('studentPoints-error').hidden = false;
      } else {

        const request: FinalizeScoringRequest = new FinalizeScoringRequest(
          this.initialData.finalizeScore.questionId, this.studentId, studentPoints
        );

        this.finalizeScoringService.save(request).subscribe(
          (response: SaveResponse) => {
            if (response.saved) {
              this.message = 'teacher/results/question_scored_successfully';
              this.navigateBack();
            } else {
              this.message = 'teacher/results/question_not_scored';
            }
            this.saveSnackBar(this.message);
          }
        );
      }
    }
  }

  navigateBack(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
