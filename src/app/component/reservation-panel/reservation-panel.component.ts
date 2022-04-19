import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-panel',
  templateUrl: './reservation-panel.component.html',
  styleUrls: ['./reservation-panel.component.css']
})
export class ReservationPanelComponent implements OnInit {
  private _currentDate!: string;

  constructor() {}

  ngOnInit(): void {
    this._currentDate = new Date().toISOString();
  }

  get currentDate() {
    return this._currentDate;
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
