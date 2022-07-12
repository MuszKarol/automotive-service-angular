import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {VisitDTO} from "../../dto/VisitDTO";

@Component({
  selector: 'app-visit-panel',
  templateUrl: './visit-panel.component.html',
  styleUrls: ['./visit-panel.component.css']
})
export class VisitPanelComponent implements OnInit {
  private _currentDate!: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this._currentDate = new Date().toISOString();
    this.userService.getAllUserCars();
  }

  get currentDate() {
    return this._currentDate;
  }

  addNewVisit(model: any) {
    const visit = {
      faultDetails: model.faultDetails,
      carDeliveryDate: model.visitDate,
      acceptationDate: model.visitDate,
      expectedStartServiceDate: model.visitDate,
      expectedEndServiceDate: model.visitDate,
      clientEmail: this.userService.getEmail(),
      vinCode: model.vin
    } as VisitDTO;

    this.userService.postNewVisit(visit);
  }

  getUsersCars() {
    return this.userService.cars;
  }
}
