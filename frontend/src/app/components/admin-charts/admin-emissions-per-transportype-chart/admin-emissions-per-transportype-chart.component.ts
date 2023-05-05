import {Component, OnInit, ViewChild} from '@angular/core';
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {UserTransportService} from "../../../services/user-transport.service";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {UserTransport} from "../../../entities/user-transport";
import {EmissionsPerTransporttypeData} from "../../../entities/emissions-per-transporttype-data";
import {Transport} from "../../../entities/transport";
import {TransportService} from "../../../services/transport.service";

@Component({
  selector: 'app-admin-admin-emissions-per-transportype-chart',
  templateUrl: './admin-emissions-per-transportype-chart.component.html',
  styleUrls: ['./admin-emissions-per-transportype-chart.component.css']
})
export class AdminEmissionsPerTransportypeChartComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  transportsOfUser: UserTransport[] = [];
  data: EmissionsPerTransporttypeData[] = [];
  public static sumEmissions: number = 0;
  allTransportTypes: Transport[] = []

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
          let label1 = Math.floor(value*100)/100 + ' co2e\n';
          let label2 = Math.floor(value/AdminEmissionsPerTransportypeChartComponent.sumEmissions*100*100)/100 + '%'
          return label1 + label2
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
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
    this.transportService.get().subscribe(
      res => {
        this.allTransportTypes = res
      }
    )

    this.userTransportService.get().subscribe(

      allData => {
        this.transportsOfUser = allData

        this.transportsOfUser.forEach(
          userTransport => {
            let index = this.data.findIndex( element =>
              element.transportID === userTransport.transportID
            );
            if (index !== -1) {
              this.data.at(index)!.emissions += userTransport.calculatedEmissions.co2e
            } else {
              this.data.push({transportID: userTransport.transportID, emissions: userTransport.calculatedEmissions.co2e})
            }
            AdminEmissionsPerTransportypeChartComponent.sumEmissions += userTransport.calculatedEmissions.co2e as number;
          }
        )

        this.data.forEach(
          data => {
            this.barChartData.datasets[0].data.push(data.emissions)
            let label = this.allTransportTypes.find(
              (element) => element.id === data.transportID
            )!.name

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
