import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard';
import { HasPermissionGuard } from '../../guards/haspermission-guard';
import { ExamsComponent } from './exams/exams.component';


const routes: Routes = [
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['STUDENT', 'EMAIL_VALIDATED'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
