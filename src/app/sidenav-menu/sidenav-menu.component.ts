import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { SidenavMenuService } from './sidenav-menu.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu: Array<any>;
  privateMode = true;
  client: boolean;
  applicant: boolean;
  admin: boolean;
  dev: boolean;

  constructor(
    private sidenavMenuService: SidenavMenuService,
    private userService: UserService) { }

  ngOnInit() {
    // this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);
  }

  // onClick(menuId) {
  //   alert(menuId)
  //   this.sidenavMenuService.toggleMenuItem(menuId);
  //   this.sidenavMenuService.closeOtherSubMenus(this.menuItems, menuId);
  // }


  isLoggedIn(): boolean {
    if (this.userService.authorities === undefined) {
      return false;
    }
    const roles: string[] = this.userService.authorities;
    if (roles.indexOf('CLIENT') > -1) {
      this.client = true;
    } else if (roles.indexOf('DEV') > -1) {
      this.dev = true;
    } else if (roles.indexOf('ADMIN') > -1) {
      this.admin = true;
    }
    return this.userService.isLoggedIn();
  }

}
