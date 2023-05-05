import {Component, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {Transport} from "../../../entities/transport";
import {UserTransport} from "../../../entities/user-transport";
import {EmissionsPerTransporttypeData} from "../../../entities/emissions-per-transporttype-data";
import {ChartConfiguration, ChartData} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import {UserTransportService} from "../../../services/user-transport.service";
import {TransportService} from "../../../services/transport.service";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {
  EmissionsPerTransportypeChartComponent
} from "../emissions-per-transportype-chart/emissions-per-transportype-chart.component";
import {EmissionsPerTripCategory} from "../../../entities/emissions-per-trip-category";

@Component({
  selector: 'app-emissions-per-trip-category',
  templateUrl: './emissions-per-trip-category.component.html',
  styleUrls: ['./emissions-per-trip-category.component.css']
})
export class EmissionsPerTripCategoryComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  allTransportTypes: Transport[] = []
  transportsOfUser: UserTransport[] = [];
  data: EmissionsPerTripCategory[] = [];
  public static sumEmissions: number = 0;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        formatter: function(value, context) {
          let label1 = Math.floor(value*100)/100 + ' kg co2e\n';
          // let label2 = Math.floor(value*100)/100 + ' km\n';
          let label3 = Math.floor(value/EmissionsPerTransportypeChartComponent.sumEmissions*100*100)/100 + '%'
          return label1  + label3
        },
        anchor: 'end',
        align: 'top',
        color: 'black',
        textAlign: 'center'
      }
    }
  };
  public barChartType: ChartConfiguration<"bar">["type"] = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ ],
    datasets: [
      { data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ]
      },

    ]
  };

  public barChartLegend = false;
  public barChartLabels: string[] = []

  constructor(
    private userTransportService: UserTransportService,
    private transportService: TransportService
  ) {
  }
  ngOnInit() {
    this.userTransportService.getTransportsByUser(DashboardComponent.user.id).subscribe(

      allData => {
        this.transportsOfUser = allData

        this.transportsOfUser.forEach(
          userTransport => {
            let index = this.data.findIndex( element =>
              element.trip_category === userTransport.trip_category
            );
            if (index !== -1) {
              this.data.at(index)!.emissions += userTransport.calculatedEmissions.co2e
              this.data.at(index)!.distance_km += userTransport.distance_km
            } else {
              this.data.push({trip_category: userTransport.trip_category, distance_km: userTransport.distance_km, emissions: userTransport.calculatedEmissions.co2e})
            }
          }
        )

        this.data.forEach(
          data => {
            this.barChartData.datasets[0].data.push(data.emissions)
            let label = data.trip_category

            this.barChartData.labels!.push(label)
            this.barChartLabels.push(label)
          }
        )
        this.chart?.update();
        this.chart?.render();
      }
    )
  }
}
