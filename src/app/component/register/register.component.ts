import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserCreateDTO} from "../../dto/UserCreateDTO";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  registerUser(model: any) {
    if (model.vin == '') {
      alert("VIN number not entered!");
    }
    else {
      const user = {
        email: model.email,
        name: model.name,
        surname: model.surname,
        role: "CLIENT",
        address: {
          buildingNumber: model.bNumber,
          street: model.street,
          postalCode: model.postalCode,
          city: model.city,
          country: model.country
        },
        contactDetails: {
          phoneNumber: model.phoneNumber
        }
      } as UserCreateDTO;

      this.userService.registerNewUser(user);
    }
  }

}
