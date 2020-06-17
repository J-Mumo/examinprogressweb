import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { CreateSectionService } from './create-section.service';
import { SaveResponseWithId } from '../../create/create-exam-request-response';
import { CreateSectionRequest } from './create-section-request-response';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  examName = String(this.activatedRoute.snapshot.paramMap.get('examName'));
  message: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private createSectionService: CreateSectionService) { }

  ngOnInit(): void {
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

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }

    } else {

      const request: CreateSectionRequest = new CreateSectionRequest(this.examId, name, description);
      this.createSectionService.save(request).subscribe(
        (response: SaveResponseWithId) => {
          if (response.saved) {
            this.message = 'teacher/exam/section/section_created_successfully';
            this.router.navigate(['/teacher/exam', this.examId, this.examName, 'section', response.id, name, 'question/add']);
          } else {
            this.message = 'teacher/exam/section/section_not_created';
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
