import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VisitGetDTO} from "../dto/VisitGetDTO";
import {VisitPatchDTO} from "../dto/VisitPatchDTO";
import {CarPartDTO} from "../dto/CarPartDTO";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService implements OnInit {
  newReservations!: VisitGetDTO[];
  acceptedReservations!: VisitGetDTO[];
  carParts!: CarPartDTO[];

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  public getNewReservations(): VisitGetDTO[] {
    return this.newReservations;
  }

  public getAcceptedReservations(): VisitGetDTO[] {
    return this.acceptedReservations;
  }

  public getCarParts(): CarPartDTO[] {
    return this.carParts;
  }

  public getUserVisits(): Observable<VisitGetDTO[]> {
    return this.httpClient.get<VisitGetDTO[]>("http://localhost:8080/visits/client", this.userService.getHeaders());
  }

  public changeVisitStatus(reservationPatchDTO: VisitPatchDTO) {
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
    this.getAllVisitsWithStatusAcceptedAndActive();
    this.getAllVisitsWithStatusNew();
  }

  public updateCarPartList() {
    this.getAllCarPartDTO();
  }

  public static createVisitGetDTO(reservationDTO: VisitGetDTO, status: string): VisitPatchDTO {
    return {
      id: reservationDTO.id,
      serviceStatus: status,
      carDeliveryDate: reservationDTO.carDeliveryDate,
      expectedStartServiceDate: reservationDTO.expectedStartServiceDate,
      expectedEndServiceDate: reservationDTO.expectedEndServiceDate
    } as VisitPatchDTO;
  }

  private getAllVisitsWithStatusNew() {
    this.httpClient.get<VisitGetDTO[]>("http://localhost:8080/visits/new", this.userService.getHeaders())
      .subscribe(response => {
        this.newReservations = response;
      }, error => {
        this.userService.renewToken();
      });
  }

  private getAllVisitsWithStatusAcceptedAndActive() {
    this.httpClient.get<VisitGetDTO[]>("http://localhost:8080/visits/accepted", this.userService.getHeaders())
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
