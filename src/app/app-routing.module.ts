import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./component/homepage/homepage.component";
import {LoginComponent} from "./component/login/login.component";
import {PartsComponent} from "./component/parts/parts.component";
import {RegisterComponent} from "./component/register/register.component";
import {VisitPanelComponent} from "./component/visit-panel/visit-panel.component";
import {VisitsComponent} from "./component/visits/visits.component";
import {VehiclesComponent} from "./component/vehicles/vehicles.component";
import {UserVisitsComponent} from "./component/user-visits/user-visits.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'parts', component: PartsComponent},
  {path: 'visit-panel', component: VisitPanelComponent},
  {path: 'visits', component: VisitsComponent},
  {path: 'user-visits', component: UserVisitsComponent},
  {path: 'vehicles', component: VehiclesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
