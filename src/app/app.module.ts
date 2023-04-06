import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "../material.module";
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {OverviewComponent} from './components/overview/overview.component';
import {TransportUserInputComponent} from './components/transport-user-input/transport-user-input.component';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {LogoutComponent} from './components/logout/logout.component';
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LayoutModule} from '@angular/cdk/layout';
import {CardComponent} from './components/card/card.component';
import {TransportModesChartComponent} from './components/charts/transport-modes-chart/transport-modes-chart.component';
import {EmissionChartComponent} from './components/charts/emission-chart/emission-chart.component';
import {UserInputChartComponent} from './components/charts/user-input-chart/user-input-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    OverviewComponent,
    TransportUserInputComponent,
    LogoutComponent,
    DashboardComponent,
    CardComponent,
    TransportModesChartComponent,
    EmissionChartComponent,
    UserInputChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    LayoutModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-AT'},
    {provide: NgChartsConfiguration, useValue: {generateColors: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
