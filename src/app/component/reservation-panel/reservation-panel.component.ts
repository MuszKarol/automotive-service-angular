import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {ReservationDTO} from "../../dto/ReservationDTO";

@Component({
  selector: 'app-reservation-panel',
  templateUrl: './reservation-panel.component.html',
  styleUrls: ['./reservation-panel.component.css']
})
export class ReservationPanelComponent implements OnInit {
  private _currentDate!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this._currentDate = new Date().toISOString();
    this.userService.getAllUserCars();
  }

  get currentDate() {
    return this._currentDate;
  }

  postNewReservation(model: any) {
    console.log(model.visitDate);

    const reservation = {
      faultDetails: model.faultDetails,
      bookingDate: model.visitDate,
      clientEmail: "test@test.com",
      mechanicEmail: "mechanictest@test.com",
      vinCode: model.vin
    } as ReservationDTO;

    this.userService.postNewReservation(reservation);
  }

  getUsersCars() {
    return this.userService.cars;
  }
}
