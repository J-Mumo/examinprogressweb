import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateExamService } from './create-exam.service';
import { CreateExamRequest, SaveResponseWithId, CreateExamInitialData } from './create-exam-request-response';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
  initialData: CreateExamInitialData;
  message: string;
  selectedExamTimerType;
  timedPerExamId = 1;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private createExamService: CreateExamService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.createExamService.getInitialData().subscribe(
      (initialData: CreateExamInitialData) => {
        this.initialData = initialData;
      }
    );
  }

  saveSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  checkIfTimedByExam() {

    if (this.timedPerExamId === this.selectedExamTimerType) {
      document.getElementById('duration-div').hidden = false;
      document.getElementById('duration').setAttribute('required', 'true');
    } else {

      document.getElementById('duration-div').hidden = true;
      document.getElementById('duration').setAttribute('required', 'false');
    }
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const description = form.value.description;
    const examDuration = form.value.duration;

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }

      if (this.selectedExamTimerType === '' || this.selectedExamTimerType === null || this.selectedExamTimerType === undefined) {
        document.getElementById('timer-type-error').hidden = false;
      } else { document.getElementById('timer-type-error').hidden = true; }

      if (examDuration === '' || examDuration === null) {
        document.getElementById('duration-error').hidden = false;
      } else { document.getElementById('duration-error').hidden = true; }

    } else {

      let duration = null;
      if (this.timedPerExamId === this.selectedExamTimerType) {
        duration = 'PT' + examDuration.hour + 'H' + examDuration.minute + 'M';
      }

      const request: CreateExamRequest = new CreateExamRequest(name, description, duration, this.selectedExamTimerType);
      this.createExamService.save(request).subscribe(
        (response: SaveResponseWithId) => {
          if (response.saved) {
            this.message = 'teacher/exam/exam_saved_successfully';
            const createSectionUrl = '/teacher/exam/' + response.id.toString() + '/' + name + '/section/create';
            this.router.navigate([createSectionUrl]);
          } else {
            this.message = 'teacher/exam/exam_not_saved';
          }
          this.saveSnackBar(this.message);
        }
      );
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
