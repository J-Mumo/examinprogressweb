import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionGuard } from '../../guards/haspermission-guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamsComponent } from './exam/exams/exams.component';
import { CreateExamComponent } from './exam/create/create-exam.component';
import { ViewExamComponent } from './exam/view/view-exam.component';
import { EditExamComponent } from './exam/edit/edit-exam.component';
import { CreateSectionComponent } from './exam/section/create/create-section.component';
import { AddQuestionComponent } from './exam/section/question/add/add-question.component';
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
import { TokensComponent } from './tokens/tokens/tokens.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
  },
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
  },
  {
    path: 'exam', children: [
      {
        path: 'create',
        component: CreateExamComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/edit',
        component: EditExamComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/view',
        component: ViewExamComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/:examName', children: [
          {
            path: 'section', children: [
              {
                path: 'create',
                component: CreateSectionComponent,
                canActivate: [HasPermissionGuard],
                data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
              },
              {
                path: ':sectionId/edit',
                component: EditSectionComponent,
                canActivate: [HasPermissionGuard],
                data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
              },
              {
                path: ':sectionId/:sectionName', children: [
                  {
                    path: 'view',
                    component: ViewSectionComponent,
                    canActivate: [HasPermissionGuard],
                    data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
                  },
                  {
                    path: 'question', children: [
                      {
                        path: 'add',
                        component: AddQuestionComponent,
                        canActivate: [HasPermissionGuard],
                        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
                      },
                      {
                        path: ':questionId', children: [
                          {
                            path: 'edit',
                            component: EditQuestionComponent,
                            canActivate: [HasPermissionGuard],
                            data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
                          },
                          {
                            path: 'view',
                            component: ViewQuestionComponent,
                            canActivate: [HasPermissionGuard],
                            data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
                          },
                        ]
                      }
                    ]
                  }
                ]
              },
            ]
          },
          {
            path: 'invites',
            component: InvitesComponent,
            canActivate: [HasPermissionGuard],
            data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
          },
          {
            path: 'invite', children: [
              {
                path: 'create',
                component: CreateInviteComponent,
                canActivate: [HasPermissionGuard],
                data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
              },
              {
                path: ':inviteId/send',
                component: SendInviteComponent,
                canActivate: [HasPermissionGuard],
                data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
              },
              {
                path: ':inviteId/view',
                component: ViewInviteComponent,
                canActivate: [HasPermissionGuard],
                data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
              },
              {
                path: ':inviteId/edit',
                component: EditInviteComponent,
                canActivate: [HasPermissionGuard],
                data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'results', children: [
      {
        path: 'exams',
        component: ShowExamsComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/results',
        component: ResultsComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/:studentId/finalize_scoring',
        component: FinalizeScoringComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/:studentId/view_performance',
        component: ViewPerformanceComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/:studentId/:sectionId/view_section_performance',
        component: SectionPerformanceComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
    ]
  },
  {
    path: 'examrooms', children: [
      {
        path: 'rooms',
        component: RoomsComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
      {
        path: ':examId/room',
        component: ExamRoomComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
      },
    ]
  },
  {
    path: 'tokens',
    component: TokensComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
