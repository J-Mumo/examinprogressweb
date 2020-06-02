import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../error.service';
import { ErrorInitialData } from '../error-response';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorMessage: string;
  today: number;
  status: string;
  redirectUrl: string;
  errorId: string;
  timestamp: any;
  errorEmail: string;
  errorNotShow: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService) {
    this.errorNotShow = true;
  }

  ngOnInit() {
    this.today = Date.now();
    this.errorEmail = environment.email;
    this.status = this.activatedRoute.snapshot.params.status;
    this.errorMessage = this.activatedRoute.snapshot.params.errorMessage;
    this.errorId = this.activatedRoute.snapshot.params.errorId;
    this.timestamp = this.activatedRoute.snapshot.params.timestamp;
    this.redirectUrl = this.activatedRoute.snapshot.params.redirectTo;

    if (this.status !== 'AngularError' && this.errorId === null) {
      this.getOrgContactDetails();
    }
  }

  private getOrgContactDetails() {
    this.errorService.getInitialData().subscribe(
      (errorInitialData: ErrorInitialData) => {
        this.errorEmail = errorInitialData.organisationDetails.infoEmail;
      }
    );
  }

  backToPreviousPage() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/login']);
    }
  }

  refreshPage() {
    window.location.reload();
  }
}
