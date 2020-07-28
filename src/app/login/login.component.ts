import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../services/auth/authentication.service';
import { UserService } from '../services/user/user.service';
import { ErrorService } from '../errors/error.service';
import { ConfigService } from '../services/config/config.service';
import { LoginService } from './login.service';
import { LoginInitialData } from './login-request-response';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigInitialData } from '../services/config/config-request-response';
import { TOKEN_NAME } from '../services/auth/auth-constants';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ParentService } from '../parent/parent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  model: any = {};
  loading = false;
  authorities;
  error: string;
  redirectUrl: string;
  redirectMessage: string;
  firstName: string;
  dashboardUrls: string[] = [];
  privateMode: boolean;
  initialdata: ConfigInitialData;
  tokenExpired: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
    public errorService: ErrorService,
    public configService: ConfigService,
    private spinner: SpinnerVisibilityService,
    private parentService: ParentService,
  ) {
    this.parentService.hidePublicHeader = false;
    this.parentService.hidePrivateHeader = true;
  }

  ngOnInit() {
    this.initializeParams();
    const emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.pattern(emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(256)])
    });
  }

  private initializeParams() {
    this.redirectMessage = this.activatedRoute.snapshot.queryParams.redirectMessage;
    this.tokenExpired = this.activatedRoute.snapshot.params.tokenExpired;
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirectTo;
  }

  private removeJwtToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }

  private navigateToValidateEmail(email: string) {
    this.router.navigate(['/email/validate'],
      { queryParams: { email } });
  }

  private emailValidated(roles: string[]): boolean {
    if (roles !== undefined) {
      const emailValidated = roles.find(x => x === 'EMAIL_VALIDATED');

      if (emailValidated) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private navigateToCurrentUserDashboard(roles: string[]): string {
    const superadmin = roles.find(x => x === 'SuperAdmin');
    const teacher = roles.find(x => x === 'TEACHER');

    if (superadmin) {
      return '/superadmin/dashboard';
    } else if (teacher) {
      return '/teacher/exam/create';
    }
    return '#';
  }

  private navigateAfterSuccess(email: string): void {
    this.userService.getUserDashboardByRole();
    const roles: string[] = this.userService.getAuthorities();

    if (!this.emailValidated(roles)) {
      this.navigateToValidateEmail(email);
    } else if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      const route = this.navigateToCurrentUserDashboard(roles);
      this.router.navigate([route]);
    }
  }

  private getLoginInitialData(email): void {

    this.loginService.getLoginInitialData(email).subscribe(
      (loginInitialData: LoginInitialData) => {
        this.loginService.firstName = loginInitialData.firstName;
        this.loginService.userId = loginInitialData.userId;
        this.navigateAfterSuccess(email);
      }
    );
  }

  private errorYouDoNotHavePermissionToAccessThisDomain(): void {
    this.translateService.get(
      'login/you_do_not_have_permission_to_access_this_domain').subscribe(
        youDoNotHavePermissionToAccessThisDomain => {
          this.error = youDoNotHavePermissionToAccessThisDomain;
        }
      );
  }

  resetForgottenPassword() {
    this.router.navigate(['/user/forgottenpassword']);
  }

  onSubmit(form: NgForm) {
    this.removeJwtToken();
    this.spinner.show();
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authenticationService.login(email, password)
      .subscribe(
        result => {
          this.loading = false;

          if (result) {
            this.userService.login(result);
            this.authorities = this.userService.authorities;
            this.userService.loggedInEmail = email;
            this.getLoginInitialData(email);
            this.spinner.hide();
          }
        },
        (error: Error) => {
          this.error = this.errorService.error;
          this.spinner.hide();
        }
      );
  }

  ngOnDestroy() {
    this.spinner.hide();
  }
}
