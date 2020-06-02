import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest, SaveResponse } from './register-request-response';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  saved = false;
  error: string;
  emailThatIsUsedAlready: string;

  constructor(
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    this.emailThatIsUsedAlready = email;

    const registerRequest: RegisterRequest = new RegisterRequest(firstName, lastName, email, password);

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
