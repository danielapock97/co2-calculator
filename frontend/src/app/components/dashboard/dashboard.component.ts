import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {User} from "../../entities/user";
import {EmissionChartComponent} from "../charts/emission-chart/emission-chart.component";
import {AdminEmissionChartComponent} from "../admin-charts/admin-emission-chart/admin-emission-chart.component";
import {UserTransportService} from "../../services/user-transport.service";
import {Transport} from "../../entities/transport";
import {UserTransport} from "../../entities/user-transport";
import {TransportModesChartComponent} from "../charts/transport-modes-chart/transport-modes-chart.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public static user: User;
  public static enterpriseEmissions: number = 0;
  public static emissionsOfTheDay: number = 0;
  public static enterpriseEmssionsOfToday: number = 0;
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 }
        }
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userTransportService: UserTransportService
    ) {}

  ngOnInit() {
    DashboardComponent.user = JSON.parse(window.localStorage.getItem('user')!) as User;
    DashboardComponent.enterpriseEmissions = 0;
    this.userTransportService.get().subscribe(
      res => {
        res.forEach((value: UserTransport, index: number) => {
          DashboardComponent.enterpriseEmissions += value.calculatedEmissions.co2e
        })
      }
    )
    this.calculateEmissionsOfToday();
    this.calculateEnterpriseEmissionsOfToday();
  }

  public static transportIdMapping: Map<string,string> = new Map<string, string>([
    ['passenger_train-route_subway-fuel_source_na', 'Subway'],
    ['passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na', 'Automobile'],
    ['passenger_vehicle-vehicle_type_bicycle-fuel_source_na-distance_na-engine_size_na', 'Bicycle'],
    ['passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na', 'Bus'],
    ['passenger_vehicle-vehicle_type_taxi-fuel_source_na-distance_na-engine_size_na', 'Taxi'],
    ['passenger_vehicle-vehicle_type_van-fuel_source_na-distance_na-engine_size_na', 'Van']
  ])

  public static monthMapping: Map<number, string> = new Map<number, string>([
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December'],
  ])
  protected readonly EmissionChartComponent = EmissionChartComponent;
  protected readonly Math = Math;
  protected readonly AdminEmissionChartComponent = AdminEmissionChartComponent;

  getEmissionComparison(): string {
    let userEmissions = EmissionChartComponent.sumAllEmissions;
    let enterpriseEmissions = DashboardComponent.enterpriseEmissions;
    let percentComparison = Math.floor((userEmissions/enterpriseEmissions*100)*100)/100
    return percentComparison + " %";
  }

  calculateEmissionsOfToday(): void {
    this.userTransportService.getTransportsByUser(DashboardComponent.user.id).subscribe(
      res => {
        let today = new Date();
        res.forEach((value, index) => {
          if ((new Date(value.date)).toDateString() === today.toDateString()) {
            DashboardComponent.emissionsOfTheDay += value.calculatedEmissions.co2e
          }
        })
      })
  }

  calculateEnterpriseEmissionsOfToday(): void {
    // DashboardComponent.emissionsOfTheDay = 0;

    this.userTransportService.get().subscribe(
      res => {
        console.log(res)
        let today = new Date();
        res.forEach((value, index) => {
          if ((new Date(value.date)).toDateString() === today.toDateString()) {
            DashboardComponent.enterpriseEmssionsOfToday = DashboardComponent.enterpriseEmssionsOfToday + value.calculatedEmissions.co2e
          }
        })
      })
  }

  getTodaysEmissions(): string {
    return Math.floor(DashboardComponent.emissionsOfTheDay*100)/100 + ' kg co2e';
  }

  getTodaysPercentOfEnterpriseEmissions(): string {
    let percentOfEnterpriseEmissionsToday = (DashboardComponent.emissionsOfTheDay / DashboardComponent.enterpriseEmssionsOfToday * 100)
    return Math.floor(percentOfEnterpriseEmissionsToday * 100)/100 + ' %'
  }

    protected readonly TransportModesChartComponent = TransportModesChartComponent;
}
