import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SaveResponse, SendMessageRequest } from './home-request-response';
import { HomeService } from './home.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;

  constructor(
    private homeService: HomeService,
    ) { }

  ngOnInit(): void {
    AOS.init();
  }

  onSendMessage(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;
    console.log(name,email,message)

    if (!form.valid) {
      const controls = form.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            document.getElementById(name+'-error').hidden = false;
          } else { document.getElementById(name+'-error').hidden = true; }
      }
    } else {

      const request: SendMessageRequest = new SendMessageRequest(name, email, message);
      this.homeService.sendMessage(request).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            document.getElementById('sent-message').style.display = 'block'
            form.reset()
          } else {
            document.getElementById('error-message').style.display = 'block'
          }
        }
      );
    }
  }

  subscribeToMailingList(form: NgForm) {
    const email = form.value.email;

    if (!form.valid) {
      const controls = form.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            document.getElementById(name+'-subscribe-error').hidden = false;
          } else { document.getElementById(name+'-subscribe-error').hidden = true; }
      }
    } else {

      this.homeService.subscribeToMailingList(email).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            document.getElementById('subscribe-success').style.display = 'block'
            form.reset()
          } else {
            document.getElementById('subscribe-error-').style.display = 'block'
          }
        }
      );
    }
  }
}
