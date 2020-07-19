import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { CreateSectionService } from './create-section.service';
import { SaveResponseWithId } from '../../create/create-exam-request-response';
import { CreateSectionRequest, CreateSectionInitialData } from './create-section-request-response';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  initialData: CreateSectionInitialData;
  message: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private createSectionService: CreateSectionService) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.createSectionService.getInitialData(this.examId).subscribe(
      (initialData: CreateSectionInitialData) => {
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
    const sectionDuration = form.value.duration !== undefined ? form.value.duration : null;

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }

    } else if (sectionDuration === '' || sectionDuration === null) {
      document.getElementById('duration-error').hidden = false;
    } else {

      document.getElementById('duration-error').hidden = true;
      const duration = sectionDuration != null ? 'PT' + sectionDuration.hour + 'H' + sectionDuration.minute + 'M' : null;
      const request: CreateSectionRequest = new CreateSectionRequest(this.examId, name, description, duration);
      this.createSectionService.save(request).subscribe(
        (response: SaveResponseWithId) => {
          if (response.saved) {
            this.message = 'teacher/exam/section/section_saved_successfully';
            const createQuestionUrl = '/teacher/exam/' + this.examId.toString() + '/' + this.examName
              + '/section/' + response.id.toString() + '/' + name + '/question/add';
            this.router.navigate([createQuestionUrl]);
          } else {
            this.message = 'teacher/exam/section/section_saved_created';
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
