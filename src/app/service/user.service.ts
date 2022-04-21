import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarGroupDTO} from "../dto/CarGroupDTO";
import {CarDTO} from "../dto/CarDTO";
import {UserCreateDTO} from "../dto/UserCreateDTO";
import {UserGetDTO} from "../dto/UserGetDTO";
import {ReservationDTO} from "../dto/ReservationDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  carApiURL = "http://localhost:9091";
  serviceApiURL = "http://localhost:8080";
  userId = "584fa7c0-dd6e-4b9c-9275-133bae8fcbcb";  //TODO remove
  cars!: CarDTO[];
  carsInGroups!: CarGroupDTO[];

  constructor(private httpClient: HttpClient) {}

  getGroupedCars() {
    return this.httpClient.get<CarGroupDTO[]>(this.carApiURL + "/cars/grouped").subscribe(response => {
      this.carsInGroups = response
    });
  }

  registerNewUser(user: UserCreateDTO) {
    this.httpClient.post(this.serviceApiURL + "/users/new", user)
      .subscribe( response => {
          console.log(response);
          },
        error => {
          console.log(error);
        });
  }

  postNewCar(car: CarDTO) {
    this.httpClient.post(this.serviceApiURL + "/users/" + this.userId + "/vehicle", car)
      .subscribe( response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  postNewReservation(reservation: ReservationDTO) {
    this.httpClient.post("http://localhost:8080/visits/new", reservation)
      .subscribe( response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  getAllUserCars() {
    this.httpClient.get<UserGetDTO>(this.serviceApiURL + "/users/"+ this.userId)
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
      });
  }
}
