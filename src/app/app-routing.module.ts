import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {TransportUserInputComponent} from "./components/transport-user-input/transport-user-input.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent, title: "Login"
  },
  {
    path: 'login', component: LoginComponent, title: "Login"
  },
  {
    path: 'overview/:id', component: OverviewComponent,
    children: [
      {
        path: 'new-calculation', component: TransportUserInputComponent, title: "New Calculation"
      },
      {
        path: 'my-statistics', component: DashboardComponent, title: "My Statistics"
      },
      {
        path: 'statistics-all', component: DashboardComponent, title: "Statistics"
      },
      {
        path: 'about', component: TransportUserInputComponent, title: "About"
      },
    ]
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
