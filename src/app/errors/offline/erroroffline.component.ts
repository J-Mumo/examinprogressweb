import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-erroroffline',
  templateUrl: './erroroffline.component.html'
})
export class ErrorofflineComponent implements OnInit {
  redirectUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.redirectUrl = this.activatedRoute.snapshot.params.redirectTo;
  }

  backToPreviousPage() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
