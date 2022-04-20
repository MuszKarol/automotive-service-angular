import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ReservationsComponent } from './component/reservations/reservations.component';
import { ReservationPanelComponent } from './component/reservation-panel/reservation-panel.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    ReservationsComponent,
    ReservationPanelComponent,
    VehiclesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
