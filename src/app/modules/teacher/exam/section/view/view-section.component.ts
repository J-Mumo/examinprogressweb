import { Component, OnInit } from '@angular/core';
import { ViewSectionService } from './view-section.service';
import { ActivatedRoute } from '@angular/router';
import { ViewSectionInitialData, MultipleChoiceQuestionTransfer } from './view-section-request-response';
import { MatTableDataSource } from '@angular/material/table';

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
  questions: MatTableDataSource<MultipleChoiceQuestionTransfer>;
  questionColumns: string[] = ['question', 'score', 'viewQuestion', 'actions'];

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
        this.questions = new MatTableDataSource(initialData.multipleChoiceQuestionTransfers);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.questions.filter = filterValue.trim().toLowerCase();
  }
}
