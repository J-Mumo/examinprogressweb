import { Component, OnInit } from '@angular/core';
import { ExamDetailService } from './exam-detail.service';
import { ExamDetailInitialData, ExamDetailRequest } from './exam-detail-request-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  initialData: ExamDetailInitialData;
  examExists: boolean;
  isToday: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examDetailService: ExamDetailService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    const inviteCode = this.activatedRoute.snapshot.queryParamMap.get('invitecode');
    const inviteLink = inviteCode !== null ? true : false;
    const code = inviteLink ? inviteCode : token;

    const request: ExamDetailRequest = new ExamDetailRequest(inviteLink, code);

    this.examDetailService.getInitialData(request).subscribe(
      (initialData: ExamDetailInitialData) => {
        this.initialData = initialData;
        if (initialData.examExists) {
          this.examExists = true;
        }
        const today = new Date(new Date().toDateString());
        const startDate = new Date(new Date(initialData.startDate).toDateString());
        console.log(today);
        console.log(new Date(new Date(initialData.startDate).toDateString()));
        if (today <= startDate) {
          this.isToday = true;
        }
      }
    );
  }
}
