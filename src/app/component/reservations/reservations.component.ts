import {Component, OnInit} from '@angular/core';
import {AdministrationService} from "../../service/administration.service";
import {ReservationGetDTO} from "../../dto/ReservationGetDTO";
import {ReservationPatchDTO} from "../../dto/ReservationPatchDTO";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.administrationService.updateAll();
  }

  acceptReservationRequest(reservationDTO: ReservationGetDTO) {
    this.administrationService.changeVisitStatus(
      ReservationsComponent.createReservationGetDTO(reservationDTO, "ACCEPTED")
    );
  }

  rejectReservationRequest(reservationDTO: ReservationGetDTO) {
    this.administrationService.changeVisitStatus(
      ReservationsComponent.createReservationGetDTO(reservationDTO, "REJECTED")
    );
  }

  startService(reservationDTO: ReservationGetDTO) {
    this.administrationService.changeVisitStatus(
      ReservationsComponent.createReservationGetDTO(reservationDTO, "ACTIVE")
    );
  }

  finishService(reservationDTO: ReservationGetDTO) {
    this.administrationService.changeVisitStatus(
      ReservationsComponent.createReservationGetDTO(reservationDTO, "DONE")
    );
  }

  modifyReservationRequest(model: any, visitId: string) {
    const reservation = {
      id: visitId,
      serviceStatus: "NEW",
      carDeliveryDate: model.deliveryDate,
      expectedStartServiceDate: model.startServiceDate,
      expectedEndServiceDate: model.endServiceDate,
      mechanicEmail: "mechanictest@test.com"
    } as ReservationPatchDTO;

    this.administrationService.changeVisitStatus(reservation);
  }

  getAllPendingVisitRequests(): ReservationGetDTO[] {
    return this.administrationService.getNewReservations();
  }

  getAllAcceptedAndUnfinishedVisits(): ReservationGetDTO[] {
    return this.administrationService.getAcceptedReservations();
  }

  private static createReservationGetDTO(reservationDTO: ReservationGetDTO, status: string): ReservationPatchDTO {
    return {
      id: reservationDTO.id,
      serviceStatus: status,
      carDeliveryDate: reservationDTO.carDeliveryDate,
      expectedStartServiceDate: reservationDTO.expectedStartServiceDate,
      expectedEndServiceDate: reservationDTO.expectedEndServiceDate,
      mechanicEmail: reservationDTO.mechanicEmail
    } as ReservationPatchDTO;
  }
}
