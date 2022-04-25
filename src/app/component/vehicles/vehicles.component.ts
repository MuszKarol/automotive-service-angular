import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {CarGroupDTO} from "../../dto/CarGroupDTO";
import {CarDTO} from "../../dto/CarDTO";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  cars!: CarGroupDTO[]
  models: string[] = []
  markKey!: string

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getGroupedCars();
    this.refresh();
  }

  onChange(event: Event) {
    this.markKey = (event.target as HTMLInputElement).value;

    if (this.cars != null) {
      // @ts-ignore
      this.models = this.cars.find( car => car['brandName'] == this.markKey).models;
    }
  }

  onSubmit(model: any) {
    if (model.vin == '') {
      alert("VIN number not entered!");
    }
    else {

      const car = {
        vinCode: model.vin,
        licensePlate: model.license,
        modelName: model.model,
        brandName: model.brand
      } as CarDTO;

      this.userService.postNewCar(car);
    }
  }

  refresh() {
    this.userService.getAllUserCars();
  }

  getUserCars() {
    return this.userService.cars;
  }

  remove(vin: string) {
    console.log(vin)
    this.userService.deleteUserCar(vin);
  }

  private getGroupedCars() {
    this.userService.getGroupedCars();
    this.cars = this.userService.carsInGroups;
  }
}
