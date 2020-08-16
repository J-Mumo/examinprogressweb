import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionGuard } from '../../guards/haspermission-guard';
import { ExamsComponent } from './exams/exams.component';
import { ExaminprogressComponent } from './exam/examinprogress/examinprogress.component';


const routes: Routes = [
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
  },
  {
    path: 'exam', children: [
      {
        path: 'examinprogress/:examTokenId',
        component: ExaminprogressComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
