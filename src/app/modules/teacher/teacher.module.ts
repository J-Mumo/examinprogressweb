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
import { CreateInviteComponent } from './exam/invite/create/create-invite.component';
import { InvitesComponent } from './exam/invite/invites/invites.component';
import { SendInviteComponent } from './exam/invite/send/send-invite.component';
import { ViewInviteComponent } from './exam/invite/view/view-invite.component';
import { EditInviteComponent } from './exam/invite/edit/edit-invite.component';
import { ShowExamsComponent } from './results/show-exams/show-exams.component';
import { ResultsComponent } from './results/results/results.component';
import { FinalizeScoringComponent } from './results/finalize-scoring/finalize-scoring.component';
import { ViewPerformanceComponent } from './results/view-performance/view-performance.component';
import { SectionPerformanceComponent } from './results/section-performance/section-performance.component';
import { ExamRoomComponent } from './rooms/exam-room/exam-room.component';


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
    EditQuestionComponent,
    CreateInviteComponent,
    InvitesComponent,
    SendInviteComponent,
    ViewInviteComponent,
    EditInviteComponent,
    ShowExamsComponent,
    ResultsComponent,
    FinalizeScoringComponent,
    ViewPerformanceComponent,
    SectionPerformanceComponent,
    ExamRoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
