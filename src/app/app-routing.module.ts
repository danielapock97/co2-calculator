import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {TransportUserInputComponent} from "./components/transport-user-input/transport-user-input.component";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, title: "Login"
  },
  {
    path: 'overview', component: OverviewComponent, title: "Overview"
  },
  {
    path: 'new-calculation', component: TransportUserInputComponent, title: "new-calculation"
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
