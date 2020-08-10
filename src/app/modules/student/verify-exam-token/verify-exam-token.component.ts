import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyExamTokenService } from './verify-exam-token.service';
import { VerifyExamTokenRequest, VerifyExamTokenResponse } from './verify-exam-token-request-response';

@Component({
  selector: 'app-verify-exam-token',
  templateUrl: './verify-exam-token.component.html',
  styleUrls: ['./verify-exam-token.component.scss']
})
export class VerifyExamTokenComponent implements OnInit {
  tokenError: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private verifyExamTokenService: VerifyExamTokenService ) { }

  ngOnInit(): void {
    this.verifyExamToken();
  }

  verifyExamToken() {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    const inviteCode = this.activatedRoute.snapshot.queryParamMap.get('invitecode');
    const inviteLink = inviteCode !== null ? true : false;
    const code = inviteLink ? inviteCode : token;

    const request: VerifyExamTokenRequest = new VerifyExamTokenRequest(inviteLink, code);

    this.verifyExamTokenService.verifyToken(request).subscribe(
      (response: VerifyExamTokenResponse) => {
        if (response.verified) {
          if (response.registered) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['register'], { queryParams: { email: response.email, isInviteLink: inviteLink, code } });
          }
        } else {
          this.tokenError = true;
        }
      }
    );
  }
}
