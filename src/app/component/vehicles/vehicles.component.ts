import {Component, OnInit} from '@angular/core';
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
  models!: string[] | undefined
  markKey!: string

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getGroupedCars();
    this.cars = this.userService.carsInGroups;
    this.refresh();
  }

  onChange(event: Event) {
    this.markKey = (event.target as HTMLInputElement).value;

    this.cars = this.userService.carsInGroups;

    if (this.cars != undefined) {
      this.models = this.cars.find(car => car['brandName'] == this.markKey)?.models;
    }
  }

  onSubmit(model: any) {
    if (model.vin == '') {
      alert("VIN number not entered!");
    } else {

      const car = {
        vinCode: model.vin,
        licensePlate: model.license,
        carRegistrationDate: model.carRegistrationDate,
        modelName: model.model,
        brandName: model.brand,
        version: model.version,
        engine: model.engine
      } as CarDTO;

      this.userService.postNewCar(car);
    }
  }

  isModelEmpty() {
    return this.models != undefined;
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
}
