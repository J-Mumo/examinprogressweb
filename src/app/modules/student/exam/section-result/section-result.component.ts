import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionPerformanceInitialData } from './section-result-request-response';
import { SectionResultService } from './section-result.service';

@Component({
  selector: 'app-section-result',
  templateUrl: './section-result.component.html',
  styleUrls: ['./section-result.component.scss']
})
export class SectionResultComponent implements OnInit {
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  examTokenId = Number(this.activatedRoute.snapshot.paramMap.get('examTokenId'));
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
    private sectionResultService: SectionResultService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.sectionResultService.getInitialData(this.sectionId).subscribe(
      (initialData: SectionPerformanceInitialData) => {
        this.initialData = initialData;
        let percent = initialData.percentScore;
        percent = +percent.toFixed(2);
        initialData.percentScore = percent;
      }
    );
  }
}
