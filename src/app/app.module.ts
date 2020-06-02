import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import localeEn from '@angular/common/locales/en';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { EqualValidator } from './directive/equalvalidator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './errors/404/error404.component';
import { ErrorComponent } from './errors/error/error.component';
import { ErrorofflineComponent } from './errors/offline/erroroffline.component';
import { registerLocaleData } from '@angular/common';
import { ErrorService } from './errors/error.service';
import { EmailvalidatedComponent } from './email/emailvalidated/emailvalidated.component';
import { ForgotpasswordComponent } from './email/forgotpassword/forgotpassword.component';
import { ResetforgottenpasswordComponent } from './email/resetforgottenpassword/resetforgottenpassword.component';
import { ValidateemailComponent } from './email/validateemail/validateemail.component';

registerLocaleData(localeEn, 'en');

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const jwtConf = {
  config: {
    throwNoTokenError: false,
    tokenGetter,
    whitelistedDomains: ['localhost:8080'],
  }
};

@NgModule({
  declarations: [
    EqualValidator,
    AppComponent,
    FooterComponent,
    HomeComponent,
    ParentComponent,
    RegisterComponent,
    LoginComponent,
    Error404Component,
    ErrorComponent,
    ErrorofflineComponent,
    EmailvalidatedComponent,
    ForgotpasswordComponent,
    ResetforgottenpasswordComponent,
    ValidateemailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot(jwtConf),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorService },
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
