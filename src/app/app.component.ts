import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'examinprogressweb';

  constructor(
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.getInitialData();
  }

  private getInitialData(): void {
    this.setDefaultLang();
  }

  private setDefaultLang() {
    this.translateService.addLangs(['en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    localStorage.setItem('locale', this.translateService.currentLang);
  }
}
