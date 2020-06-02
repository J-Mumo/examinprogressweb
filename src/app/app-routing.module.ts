import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { HasPermissionGuard } from './guards/haspermission-guard';
import { ParentComponent } from './parent/parent.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmailvalidatedComponent } from './email/emailvalidated/emailvalidated.component';
import { ValidateemailComponent } from './email/validateemail/validateemail.component';
import { ForgotpasswordComponent } from './email/forgotpassword/forgotpassword.component';
import { Error404Component } from './errors/404/error404.component';
import { ErrorComponent } from './errors/error/error.component';
import { ErrorofflineComponent } from './errors/offline/erroroffline.component';


const routes: Routes = [
  {
    path: '',
    component: ParentComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'user/validate', component: ValidateemailComponent, canActivate: [AuthGuard] },
      { path: 'email/validate', component: ValidateemailComponent, canActivate: [AuthGuard] },
      { path: 'user/activate', component: EmailvalidatedComponent },
      { path: 'login', component: LoginComponent },
      { path: 'user/forgottenpassword', component: ForgotpasswordComponent },
      { path: 'error404', component: Error404Component },
      { path: 'erroroffline', component: ErrorofflineComponent },
      { path: 'error', component: ErrorComponent },
      { path: '', component: HomeComponent },
      { path: '**', component: Error404Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
