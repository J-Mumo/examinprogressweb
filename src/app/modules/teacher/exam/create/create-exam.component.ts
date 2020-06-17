import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateExamService } from './create-exam.service';
import { ExamRequest, SaveResponseWithId } from './create-exam-request-response';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
  message: string;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private createExamService: CreateExamService
  ) { }

  ngOnInit(): void {
  }

  saveSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const description = form.value.description;
    const startDate = form.value.startDate;
    const time = form.value.startTime;
    const examTime = form.value.duration;

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }

      if (startDate === '') {
        document.getElementById('date-error').hidden = false;
      } else { document.getElementById('date-error').hidden = true; }

      if (time === '') {
        document.getElementById('time-error').hidden = false;
      } else { document.getElementById('time-error').hidden = true; }

      if (examTime === '') {
        document.getElementById('duration-error').hidden = false;
      } else { document.getElementById('duration-error').hidden = true; }

    } else {

      const startTime = startDate + ' ' + time.hour + ':' + time.minute;
      const duration = 'PT' + examTime.hour + 'H' + examTime.minute + 'M';
      const request: ExamRequest = new ExamRequest(name, description, startDate, startTime, duration);
      this.createExamService.save(request).subscribe(
        (response: SaveResponseWithId) => {
          if (response.saved){
            this.message = 'teacher/exam/exam_created_successfully';
            this.router.navigate(['/teacher/exam', response.id, name, 'section/create']);
          } else {
            this.message = 'teacher/exam/exam_not_created';
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
