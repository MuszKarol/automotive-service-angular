import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationGetDTO} from "../dto/ReservationGetDTO";
import {ReservationPatchDTO} from "../dto/ReservationPatchDTO";
import {CarPartDTO} from "../dto/CarPartDTO";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService implements OnInit{
  newReservations!: ReservationGetDTO[];
  acceptedReservations!: ReservationGetDTO[];
  carParts!: CarPartDTO[];

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  ngOnInit(): void {}

  public getNewReservations(): ReservationGetDTO[] {
    return this.newReservations;
  }

  public getAcceptedReservations(): ReservationGetDTO[] {
    return this.acceptedReservations;
  }

  public getCarParts(): CarPartDTO[] {
    return this.carParts;
  }

  public changeVisitStatus(reservationPatchDTO: ReservationPatchDTO) {
    this.httpClient.patch("http://localhost:8080/visits", reservationPatchDTO, this.userService.getHeaders())
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.userService.renewToken();
      });
  }

  public postCarPart(carPartDTO: CarPartDTO) {
    this.httpClient.post("http://localhost:8080/order/parts", carPartDTO, this.userService.getHeaders())
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.userService.renewToken();
      });
  }

  public deleteCarPart(carPartCode: string) {
    this.httpClient.delete("http://localhost:8080/order/parts/" + carPartCode, this.userService.getHeaders())
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.userService.renewToken();
      });
  }

  public updateAll() {
    this.getAllReservationsWithStatusAcceptedAndActive();
    this.getAllReservationsWithStatusNew();
  }

  public updateCarPartList() {
    this.getAllCarPartDTO();
  }

  private getAllReservationsWithStatusNew() {
    this.httpClient.get<ReservationGetDTO[]>("http://localhost:8080/visits/new", this.userService.getHeaders())
      .subscribe(response => {
        this.newReservations = response;
      },error => {
        this.userService.renewToken();
      });
  }

  private getAllReservationsWithStatusAcceptedAndActive() {
    this.httpClient.get<ReservationGetDTO[]>("http://localhost:8080/visits/accepted", this.userService.getHeaders())
      .subscribe(response => {
        this.acceptedReservations = response;
      },
          error => {
          this.userService.renewToken();
      });
  }

  private getAllCarPartDTO() {
    this.httpClient.get<CarPartDTO[]>("http://localhost:8080/order/parts", this.userService.getHeaders())
      .subscribe(response => {
        this.carParts = response;
      },
          error => {
          this.userService.renewToken();
      });
  }
}
