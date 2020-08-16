import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest, SaveResponse } from './register-request-response';
import { RegisterService } from './register.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  saved = false;
  error: string;
  emailThatIsUsedAlready: string;
  studentEmail: string;
  isInviteLink: boolean;
  code: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        this.studentEmail = params.email;
        this.isInviteLink = params.inviteLink;
        this.code = params.code;
      }
    );
  }

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    this.emailThatIsUsedAlready = email;

    const registerRequest: RegisterRequest = new RegisterRequest(
      firstName, lastName, email, password, this.isInviteLink, this.code);

    this.registerService.save(registerRequest).subscribe(
      (response: SaveResponse) => {
        if (response.saved) {
          this.saved = true;
          form.reset();
        } else {
          this.error = response.error;
        }
      }
    );
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
