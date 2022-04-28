import {Component, OnInit} from '@angular/core';
import {AdministrationService} from "../../service/administration.service";
import {VisitGetDTO} from "../../dto/VisitGetDTO";

@Component({
  selector: 'app-user-visits',
  templateUrl: './user-visits.component.html',
  styleUrls: ['./user-visits.component.css']
})
export class UserVisitsComponent implements OnInit {
  visits!: VisitGetDTO[];

  constructor(private administrationService: AdministrationService) {
  }

  ngOnInit(): void {
    this.getAllUserVisits();
  }

  getAllUserVisits() {
    this.administrationService.getUserVisits()
      .subscribe(response => {
        this.visits = response;
      });
  }

  removeVisit(visitGetDTO: VisitGetDTO, status: string) {
    if (status == 'NEW') {
      this.administrationService.changeVisitStatus(
        AdministrationService.createVisitGetDTO(visitGetDTO, "REJECTED")
      );
    }
  }
}
