import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionsService } from './sections.service';
import { SectionsInitialData } from './sections-request-response';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  initialData: SectionsInitialData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sectionsService: SectionsService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.sectionsService.getInitialData(this.examId).subscribe(
      (initialData: SectionsInitialData) => {
        this.initialData = initialData;
      }
    );
  }
}
