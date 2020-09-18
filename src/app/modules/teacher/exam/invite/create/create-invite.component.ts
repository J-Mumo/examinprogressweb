import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { CreateInviteRequest, SaveResponseWithId, CreateInviteInitialData } from './create-invite-request-response';
import { CreateInviteService } from './create-invite.service';

@Component({
  selector: 'app-create-invite',
  templateUrl: './create-invite.component.html',
  styleUrls: ['./create-invite.component.scss']
})
export class CreateInviteComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  initialData: CreateInviteInitialData;
  message: string;
  examPausable = false;
  time = {hour: 0, minute: 0};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private createInviteService: CreateInviteService ) { }

  ngOnInit(): void {
  }

  getInitialData() {
    this.createInviteService.getInitialData(this.examId).subscribe(
      (initialData: CreateInviteInitialData) => {
        this.initialData = initialData;

        if (initialData?.timedPerQuestion) {
          this.examPausable = true;
        }
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
    const examStartDate = form.value.startDate;
    const examEndDate = form.value.endDate;
    const pausable = form.value.pausable;
    let startTime = form.value.startTime;
    startTime = startTime !== undefined ? ('0' + startTime.hour).slice(-2) + ':' + ('0' + startTime.minute).slice(-2) : null;
    const startDate = new Date(new Date(examStartDate).toDateString());
    const today = new Date(new Date().toDateString());

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }
      if (examStartDate === '') {
        document.getElementById('startDate-error').hidden = false;
      } else { document.getElementById('startDate-error').hidden = true; }
      if (examEndDate === '' && this.examPausable) {
        document.getElementById('endDate-error').hidden = false;
      } else if (this.examPausable) { document.getElementById('endDate-error').hidden = true; }
      if (startTime === '' && !this.examPausable || startTime === null) {
        document.getElementById('startTime-error').hidden = false;
      } else if (!this.examPausable) { document.getElementById('startTime-error').hidden = true; }

    } else if (startDate < today) {
      document.getElementById('name-error').hidden = true;
      document.getElementById('startDate-error').hidden = false;
    } else {
      document.getElementById('startDate-error').hidden = true;

      const request: CreateInviteRequest = new CreateInviteRequest(
        this.examId, name, examStartDate, examEndDate, pausable, startTime);

      this.createInviteService.save(request).subscribe(
        (response: SaveResponseWithId) => {
          if (response.saved) {
            this.message = 'teacher/exam/invite/invite_saved_successfully';
            const createQuestionUrl = '/teacher/exam/' + this.examId.toString() + '/' + this.examName
              + '/invite/' + response.id.toString() + '/send';
            this.router.navigate([createQuestionUrl]);
          } else {
            this.message = 'teacher/exam/invite/invite_saved_created';
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
