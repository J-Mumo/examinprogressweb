import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionPerformanceInitialData, SectionPerformanceRequestInitialData } from './section-performance-request-response';
import { SectionPerformanceService } from './section-performance.service';

@Component({
  selector: 'app-section-performance',
  templateUrl: './section-performance.component.html',
  styleUrls: ['./section-performance.component.scss']
})
export class SectionPerformanceComponent implements OnInit {
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  studentId = Number(this.activatedRoute.snapshot.paramMap.get('studentId'));
  initialData: SectionPerformanceInitialData;
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
    private sectionPerformanceService: SectionPerformanceService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    const request: SectionPerformanceRequestInitialData = new SectionPerformanceRequestInitialData(
      this.sectionId, this.studentId
    );

    this.sectionPerformanceService.getInitialData(request).subscribe(
      (initialData: SectionPerformanceInitialData) => {
        this.initialData = initialData;
      }
    );
  }
}
