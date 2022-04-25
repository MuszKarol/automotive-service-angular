import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  client: boolean = false;
  admin: boolean = false;
  isLogged: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.admin = this.isUserLogged("ADMIN");
    this.client = this.isUserLogged("CLIENT");
    this.isLogged = !(this.admin || this.client);
  }

  isUserLogged(userRole: string) {
    let role = this.userService.getRole();
    return (role != undefined || role != "") && role == userRole;
  }

  getUserEmail() {
    return this.userService.getEmail();
  }

  logout() {
    this.userService.removeTokenAndLoginData();
    window.location.reload();
  }
}
