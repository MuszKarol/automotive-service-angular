import {Component, OnInit} from '@angular/core';
import {AdministrationService} from "../../service/administration.service";
import {VisitGetDTO} from "../../dto/VisitGetDTO";
import {VisitPatchDTO} from "../../dto/VisitPatchDTO";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.administrationService.updateAll();
  }

  acceptReservationRequest(reservationDTO: VisitGetDTO) {
    this.administrationService.changeVisitStatus(
      VisitsComponent.createReservationGetDTO(reservationDTO, "ACCEPTED")
    );
  }

  rejectReservationRequest(reservationDTO: VisitGetDTO) {
    this.administrationService.changeVisitStatus(
      VisitsComponent.createReservationGetDTO(reservationDTO, "REJECTED")
    );
  }

  startService(reservationDTO: VisitGetDTO) {
    this.administrationService.changeVisitStatus(
      VisitsComponent.createReservationGetDTO(reservationDTO, "ACTIVE")
    );
  }

  finishService(reservationDTO: VisitGetDTO) {
    this.administrationService.changeVisitStatus(
      VisitsComponent.createReservationGetDTO(reservationDTO, "DONE")
    );
  }

  modifyReservationRequest(model: any, visitId: string) {
    const reservation = {
      id: visitId,
      serviceStatus: "NEW",
      carDeliveryDate: model.deliveryDate,
      expectedStartServiceDate: model.startServiceDate,
      expectedEndServiceDate: model.endServiceDate,
    } as VisitPatchDTO;

    this.administrationService.changeVisitStatus(reservation);
  }

  getAllPendingVisitRequests(): VisitGetDTO[] {
    return this.administrationService.getNewReservations();
  }

  getAllAcceptedAndUnfinishedVisits(): VisitGetDTO[] {
    return this.administrationService.getAcceptedReservations();
  }

  private static createReservationGetDTO(reservationDTO: VisitGetDTO, status: string): VisitPatchDTO {
    return {
      id: reservationDTO.id,
      serviceStatus: status,
      carDeliveryDate: reservationDTO.carDeliveryDate,
      expectedStartServiceDate: reservationDTO.expectedStartServiceDate,
      expectedEndServiceDate: reservationDTO.expectedEndServiceDate
    } as VisitPatchDTO;
  }
}
