import { Component, OnInit } from '@angular/core';
import { ViewSectionService } from './view-section.service';
import { ActivatedRoute } from '@angular/router';
import { ViewSectionInitialData, QuestionTransfer } from './view-section-request-response';
import { MatTableDataSource } from '@angular/material/table';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  sectionName = String(this.activatedRoute.snapshot.paramMap.get('sectionName'));
  initialData: ViewSectionInitialData;
  questions: MatTableDataSource<QuestionTransfer>;
  questionColumns: string[] = ['question', 'questionType', 'viewQuestion', 'actions'];
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  duration = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewSectionService: ViewSectionService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.viewSectionService.getInitialData(this.sectionId).subscribe(
      (initialData: ViewSectionInitialData) => {
        this.initialData = initialData;
        this.questions = new MatTableDataSource(initialData.questionTransfers);
        this.duration = initialData.duration !== null ? initialData.duration.split(':') : [];
        this.time.hour = parseInt(this.duration[0], 10);
        this.time.minute = parseInt(this.duration[1], 10);
        this.time.second = parseInt(this.duration[2], 10);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.questions.filter = filterValue.trim().toLowerCase();
  }
}
