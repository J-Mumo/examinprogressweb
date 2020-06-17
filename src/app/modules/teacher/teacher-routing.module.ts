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
import { SectionsComponent } from './exam/section/sections/sections.component';
import { ViewSectionComponent } from './exam/section/view/view-section.component';

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
        path: ':examId/:examName', children: [
          {
            path: 'view',
            component: ViewExamComponent,
            canActivate: [HasPermissionGuard],
            data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
          },
          {
            path: 'sections',
            component: SectionsComponent,
            canActivate: [HasPermissionGuard],
            data: { authorities: ['TEACHER', 'EMAIL_VALIDATED'] }
          },
          {
            path: 'section', children: [
              {
                path: 'create',
                component: CreateSectionComponent,
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
                    ]
                  }
                ]
              },
            ]
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
