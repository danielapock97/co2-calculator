import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {User} from "../../entities/user";
import {EmissionChartComponent} from "../charts/emission-chart/emission-chart.component";
import {AdminEmissionChartComponent} from "../admin-charts/admin-emission-chart/admin-emission-chart.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  public static user: User;
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

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    AdminDashboardComponent.user = JSON.parse(window.localStorage.getItem('user')!) as User;
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
}
