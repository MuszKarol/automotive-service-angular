import {Component, OnInit} from '@angular/core';
import {CompanyDetailsService} from "../../service/company-details.service";
import {CompanyDetailsDTO} from "../../dto/CompanyDetailsDTO";
import {AddressDTO} from "../../dto/AddressDTO";
import {DayDTO} from "../../dto/DayDTO";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  details!: CompanyDetailsDTO;

  constructor(private companyDetailsService: CompanyDetailsService) {}

  ngOnInit(): void {
    this.handleCompanyDetailsGetRequest();
  }

  private handleCompanyDetailsGetRequest() {
    this.companyDetailsService.getCompanyDetails()
      .subscribe(
        response => {
          this.details = response
        }
      )
  }

  sortWeekDays(days: DayDTO[]) {
    let daysMap = new Map<string, number>
    ([
      ["monday", 1],
      ["tuesday", 2],
      ["wednesday", 3],
      ["thursday", 4],
      ["friday", 5],
      ["saturday", 6],
      ["sunday", 7],
    ]);

    return days.sort((first, second) => {
      let firstLower = daysMap.get(first.dayName.toLowerCase());
      let secondLower = daysMap.get(second.dayName.toLowerCase());

      // @ts-ignore
      return firstLower - secondLower;
    });
  }

  getFullAddress(address: AddressDTO): string {
    if (address != undefined) {
      return address.buildingNumber + " "
        + address.street + " "
        + address.city + ", "
        + address.postalCode + " "
        + address.country;
    } else {
      return "";
    }
  }

}
