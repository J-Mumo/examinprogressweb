import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html'
})
export class Error404Component implements OnInit {
  redirectUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.redirectUrl = this.activatedRoute.snapshot.params['redirectTo'];
  }

  backToPreviousPage() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
