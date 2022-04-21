import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationGetDTO} from "../dto/ReservationGetDTO";
import {ReservationPatchDTO} from "../dto/ReservationPatchDTO";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService implements OnInit{
  newReservations!: ReservationGetDTO[];
  acceptedReservations!: ReservationGetDTO[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  public getNewReservations(): ReservationGetDTO[] {
    return this.newReservations;
  }

  public getAcceptedReservations(): ReservationGetDTO[] {
    return this.acceptedReservations;
  }

  public changeVisitStatus(reservationPatchDTO: ReservationPatchDTO) {
    this.httpClient.patch("http://localhost:8080/visits", reservationPatchDTO)
      .subscribe(response => {
        console.log(response);
      }, error => {
          console.log(error);
      });
  }

  public updateAll() {
    this.getAllReservationsWithStatusAcceptedAndActive();
    this.getAllReservationsWithStatusNew();
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
}
