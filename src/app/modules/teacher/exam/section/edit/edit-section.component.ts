import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSectionService } from './edit-section.service';
import { EditSectionInitialData, EditSectionRequest, SaveResponse } from './edit-section-request-response';
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
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class EditSectionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  sectionId = Number(this.activatedRoute.snapshot.paramMap.get('sectionId'));
  initialData: EditSectionInitialData;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private editSectionService: EditSectionService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  saveSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  getInitialData() {
    this.editSectionService.getInitialData(this.sectionId).subscribe(
      (initialData: EditSectionInitialData) => {
        this.initialData = initialData;
      }
    );
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

      const request: EditSectionRequest = new EditSectionRequest(this.sectionId, name, description, duration);
      this.editSectionService.save(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'teacher/exam/section/section_saved_successfully';
            this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section', this.sectionId, name, 'view']);
          } else {
            this.message = 'teacher/exam/section/section_not_saved';
          }
          this.saveSnackBar(this.message);
        }
      );
    }
  }
}
