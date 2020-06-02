import { Component, OnInit } from '@angular/core';
import { ParentService } from './parent.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(
    public parentService: ParentService,
    public userService: UserService,
    public router: Router ) { }

  ngOnInit(): void {
  }

  public logout() {
    localStorage.clear();
    this.userService.loggedInEmail = null;
    this.router.navigate(['/login']);
  }

  editMyAccount() {
    // const roles: string[] = this.userService.authorities;

    // if (roles !== undefined) {
    //   if (roles.indexOf('DEV') > -1) {
    //     this.router.navigate(['/dev/account/settings']);
    //   } else if (roles.indexOf('ADMIN') > -1) {
    //     this.router.navigate(['/admin/myaccount/edit']);
    //   }
    // }
  }
}
