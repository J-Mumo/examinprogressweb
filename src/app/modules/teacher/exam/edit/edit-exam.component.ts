import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditExamService } from './edit-exam.service';
import { EditExamInitialData, EditExamRequest, SaveResponse } from './edit-exam-request-response';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class EditExamComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  initialData: EditExamInitialData;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private editExamService: EditExamService,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.editExamService.getInitialData(this.examId).subscribe(
      (initialData: EditExamInitialData) => {
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

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const description = form.value.description;
    const duration = form.value.duration;

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }

      if (duration === '' || duration === null) {
        document.getElementById('duration-error').hidden = false;
      } else { document.getElementById('duration-error').hidden = true; }

    } else {

      const request: EditExamRequest = new EditExamRequest(this.examId, name, description, duration);
      this.editExamService.save(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/exam_saved_successfully';
            this.router.navigate(['/teacher/exam', this.examId, 'view']);
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
