import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./component/homepage/homepage.component";
import {LoginComponent} from "./component/login/login.component";
import {OrdersComponent} from "./component/orders/orders.component";
import {RegisterComponent} from "./component/register/register.component";
import {ReservationPanelComponent} from "./component/reservation-panel/reservation-panel.component";
import {ReservationsComponent} from "./component/reservations/reservations.component";
import {VehiclesComponent} from "./component/vehicles/vehicles.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'reservation-panel', component: ReservationPanelComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'vehicles', component: VehiclesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
