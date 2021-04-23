import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SaveResponse, SendMessageRequest } from './home-request-response';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;

  constructor(
    private homeService: HomeService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  messageSnackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this.snackBar.open( res, '', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }

  onSendMessage(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;

    if (!form.valid) {
      if (name === '') {
        document.getElementById('name-error').hidden = false;
      } else { document.getElementById('name-error').hidden = true; }

      if (email === '') {
        document.getElementById('email-error').hidden = false;
      } else { document.getElementById('email-error').hidden = true; }

      if (message === '') {
        document.getElementById('message-error').hidden = false;
      } else { document.getElementById('message-error').hidden = true; }

    } else {

      const request: SendMessageRequest = new SendMessageRequest(name, email, message);
      this.homeService.sendMessage(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.message = 'email/message_sent';
          } else {
            this.message = 'email/message_not_sent';
          }
          form.reset()
          this.messageSnackBar(this.message);
        }
      );
    }
  }
}
