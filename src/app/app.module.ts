import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomepageComponent} from './component/homepage/homepage.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {PartsComponent} from './component/parts/parts.component';
import {VisitsComponent} from './component/visits/visits.component';
import {VisitPanelComponent} from './component/visit-panel/visit-panel.component';
import {VehiclesComponent} from './component/vehicles/vehicles.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UserVisitsComponent} from './component/user-visits/user-visits.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PartsComponent,
    VisitsComponent,
    VisitPanelComponent,
    VehiclesComponent,
    UserVisitsComponent
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
export class AppModule {
}
