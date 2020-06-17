import { SidenavMenu } from './sidenav-menu.model';

export const sidenavMenuItems = [
    new SidenavMenu(1, 'Home', '/', null, null, false, 0),
    new SidenavMenu(2, 'Register', '/register', null, null, false, 0),
    new SidenavMenu(3, 'Login', '/account/login', null, null, false, 0),
    new SidenavMenu(4, 'Contact', '/contact/contact_en', null, null, false, 0),
];


