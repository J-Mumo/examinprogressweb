import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StudentRoutingModule } from './student-routing.module';
import { ExamsComponent } from './exam/exams/exams.component';
import { ExaminprogressComponent } from './exam/examinprogress/examinprogress.component';
import { ExamResultComponent } from './exam/result/exam-result.component';
import { SectionResultComponent } from './exam/section-result/section-result.component';


@NgModule({
  declarations: [
    ExamsComponent,
    ExaminprogressComponent,
    ExamResultComponent,
    SectionResultComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
