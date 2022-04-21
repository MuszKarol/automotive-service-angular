import { Component, OnInit } from '@angular/core';
import {AdministrationService} from "../../service/administration.service";
import {CarPartDTO} from "../../dto/CarPartDTO";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private service: AdministrationService) { }

  ngOnInit(): void {
    this.service.updateCarPartList();
  }

  getCarPartList() {
    return this.service.getCarParts();
  }

  createNewCarPart(model: any) {
    if(model.code == "") {
      alert("No product code!")
    }
    else {
      const carPart = {
        code: model.code,
        name: model.partName,
        price: model.price,
        quantity: model.quantity
      } as CarPartDTO;

      this.service.postCarPart(carPart);
    }
  }

  removePart(code: string) {
    console.log(code);
    this.service.deleteCarPart(code);
  }
}
