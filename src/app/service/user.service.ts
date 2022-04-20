import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarGroupDTO} from "../dto/CarGroupDTO";
import {CarDTO} from "../dto/CarDTO";

interface UserDTO {
  userId: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  // public AddressDTO address;
  // public ContactDTO contactDetails;
  carDTOList: CarDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  carApiURL = "http://localhost:9091";
  serviceApiURL = "http://localhost:8080";
  userId = "";
  cars!: CarDTO[];
  carsInGroups!: CarGroupDTO[];

  constructor(private httpClient: HttpClient) {}

  getGroupedCars() {
    return this.httpClient.get<CarGroupDTO[]>(this.carApiURL + "/cars/grouped").subscribe(response => {
      this.carsInGroups = response
    });
  }

  postNewCar(car: CarDTO) {
    return this.httpClient.post(this.serviceApiURL + "/users/" + this.userId + "/vehicle", car)
      .subscribe( response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  getAllUserCars() {
    this.httpClient.get<UserDTO>(this.serviceApiURL + "/users/"+ this.userId)
      .subscribe(response => {
          this.cars = response.carDTOList;
        },
        error => {
          console.log(error);
        });
  }

  deleteUserCar(vin: string) {
    this.httpClient.delete(this.serviceApiURL + "/users/"+ this.userId + "/vehicle/" + vin).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}
