import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateExamComponent } from './exam/create/create-exam.component';
import { EditExamComponent } from './exam/edit/edit-exam.component';
import { CreateSectionComponent } from './exam/section/create/create-section.component';
import { AddQuestionComponent } from './exam/section/question/add/add-question.component';
import { ViewExamComponent } from './exam/view/view-exam.component';
import { ExamsComponent } from './exam/exams/exams.component';
import { ViewSectionComponent } from './exam/section/view/view-section.component';
import { EditSectionComponent } from './exam/section/edit/edit-section.component';
import { ViewQuestionComponent } from './exam/section/question/view/view-question.component';
import { EditQuestionComponent } from './exam/section/question/edit/edit-question.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateExamComponent,
    EditExamComponent,
    CreateSectionComponent,
    AddQuestionComponent,
    ViewExamComponent,
    ExamsComponent,
    ViewSectionComponent,
    EditSectionComponent,
    ViewQuestionComponent,
    EditQuestionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
