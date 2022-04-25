import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {LoginDTO} from "../../dto/LoginDTO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  async login(model: any) {
    if (model.email == '' || model.password == '') {
      alert("Enter all your login details!")
    }
    else {
      const loginDTO = {
        email: model.email,
        password: model.password
      } as LoginDTO;

      this.userService.removeTokenAndLoginData();

      let token = await this.userService.getToken(loginDTO)

      if (token?.token != undefined) {
        this.userService.setTokenAndLoginData(token, loginDTO);
        window.location.reload();
        this.userService.reloadToHomepage();
      }
    }
  }
}
