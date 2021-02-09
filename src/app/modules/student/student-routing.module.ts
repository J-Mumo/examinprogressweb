import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HasPermissionGuard } from '../../guards/haspermission-guard';
import { ExamsComponent } from './exam/exams/exams.component';
import { ExaminprogressComponent } from './exam/examinprogress/examinprogress.component';
import { ExamResultComponent } from './exam/result/exam-result.component';
import { SectionResultComponent } from './exam/section-result/section-result.component';

const routes: Routes = [
  {
    path: 'exams',
    component: ExamsComponent,
    // canActivate: [HasPermissionGuard],
    // data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
  },
  {
    path: 'exam', children: [
      {
        path: 'examinprogress/:examTokenId',
        component: ExaminprogressComponent,
        // canActivate: [HasPermissionGuard],
        // data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
      },
      {
        path: 'result/:examTokenId',
        component: ExamResultComponent,
        // canActivate: [HasPermissionGuard],
        // data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
      },
      {
        path: 'section/result/:examTokenId/:sectionId',
        component: SectionResultComponent,
        // canActivate: [HasPermissionGuard],
        // data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
