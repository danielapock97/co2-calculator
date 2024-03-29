import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {TransportUserInputComponent} from "./components/transport-user-input/transport-user-input.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AboutComponent} from "./components/about/about.component";
import {InfoComponent} from "./components/info/info.component";
import {AdminDashboardComponent} from "./components/adminDashboard/admin-dashboard.component";

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
        path: '', component: InfoComponent
      },
      {
        path: 'info', component: InfoComponent, title: "Info"
      },
      {
        path: 'new-calculation', component: TransportUserInputComponent, title: "New Calculation"
      },
      {
        path: 'my-statistics', component: DashboardComponent, title: "My Statistics"
      },
      {
        path: 'statistics-all', component: AdminDashboardComponent, title: "Admin Dashboard"
      },
      {
        path: 'about', component: AboutComponent, title: "About"
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
