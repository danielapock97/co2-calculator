import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {TransportUserInputComponent} from "./components/transport-user-input/transport-user-input.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, title: "Login"
  },
  {
    path: 'overview', component: OverviewComponent, title: "Overview"
  },
  {
    path: 'new-calculation', component: TransportUserInputComponent, title: "New Calculation"
  },
  {
    path: 'my-statistics', component: StatisticsComponent, title: "My Statistics"
  },
  {
    path: 'statistics-all', component: StatisticsComponent, title: "Statistics"
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
