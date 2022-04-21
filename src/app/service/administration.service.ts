import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationGetDTO} from "../dto/ReservationGetDTO";
import {ReservationPatchDTO} from "../dto/ReservationPatchDTO";
import {CarPartDTO} from "../dto/CarPartDTO";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService implements OnInit{
  newReservations!: ReservationGetDTO[];
  acceptedReservations!: ReservationGetDTO[];
  carParts!: CarPartDTO[];

  constructor(private httpClient: HttpClient) {}

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
    this.httpClient.patch("http://localhost:8080/visits", reservationPatchDTO)
      .subscribe(response => {
        console.log(response);
      }, error => {
          console.log(error);
      });
  }

  public postCarPart(carPartDTO: CarPartDTO) {
    this.httpClient.post("http://localhost:8080/order/parts", carPartDTO)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  public deleteCarPart(carPartCode: string) {
    this.httpClient.delete("http://localhost:8080/order/parts/" + carPartCode)
      .subscribe(response => {
        console.log(response);
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
    this.httpClient.get<ReservationGetDTO[]>("http://localhost:8080/visits/new")
      .subscribe(response => {
        this.newReservations = response;
      });
  }

  private getAllReservationsWithStatusAcceptedAndActive() {
    this.httpClient.get<ReservationGetDTO[]>("http://localhost:8080/visits/accepted")
      .subscribe(response => {
        this.acceptedReservations = response;
      });
  }

  private getAllCarPartDTO() {
    this.httpClient.get<CarPartDTO[]>("http://localhost:8080/order/parts")
      .subscribe(response => {
        this.carParts = response;
      });
  }
}
