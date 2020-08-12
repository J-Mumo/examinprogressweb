import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StudentRoutingModule } from './student-routing.module';
import { ExamsComponent } from './exams/exams.component';
import { ExaminprogressComponent } from './exam/examinprogress/examinprogress.component';


@NgModule({
  declarations: [
    ExamsComponent,
    ExaminprogressComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
