import { Component, OnInit, Injectable } from '@angular/core';
import { EditInviteService } from './edit-invite.service';
import { EditInviteInitialData, EditInviteRequest, SaveResponse } from './edit-invite-request-response';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
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
  selector: 'app-edit-invite',
  templateUrl: './edit-invite.component.html',
  styleUrls: ['./edit-invite.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class EditInviteComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  inviteId = Number(this.activatedRoute.snapshot.paramMap.get('inviteId'));
  initialData: EditInviteInitialData;
  message: string;
  startDate;
  endDate;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private editInviteService: EditInviteService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.editInviteService.getInitialData(this.inviteId).subscribe(
      (initialData: EditInviteInitialData) => {
        this.initialData = initialData;
        this.startDate = initialData.examStartDate.toString().split('T')[0];
        this.endDate = initialData.examEndDate.toString().split('T')[0];
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
    const examStartDate = form.value.examStartDate;
    const examEndDate = form.value.examEndDate;
    const pausable = form.value.pausable;
    const examStartTime = form.value.examStartTime;

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }
      if (examStartDate === '') {
        document.getElementById('startDate-error').hidden = false;
      } else { document.getElementById('startDate-error').hidden = true; }

    } else {

      const request: EditInviteRequest = new EditInviteRequest(this.inviteId, name, examStartDate, examEndDate, pausable, examStartTime);

      this.editInviteService.save(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/invite/invite_saved_successfully';
            this.router.navigate(['/teacher/exam', this.examId, this.examName, 'invite', this.inviteId, 'view']);
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
