import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {TransportUserService} from "../../../services/transport-user.service";
import {User} from "../../../entities/user";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {TransportUser} from "../../../entities/transport-user";
import {Emissions} from "../../../entities/emissions";
import {EmissionsChartData} from "../../../entities/emissions-chart-data";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-emission-chart',
  templateUrl: './emission-chart.component.html',
  styleUrls: ['./emission-chart.component.css']
})
export class EmissionChartComponent implements OnInit{
  allTransportsOfUser: TransportUser[] = [];
  data: EmissionsChartData[] = [];
  public static sumAllEmissions: number = 0;
  constructor(private transportUserService: TransportUserService) {
  }
  ngOnInit() {
    this.transportUserService.getTransportsByUser(DashboardComponent.user.id).subscribe(
      allData => {
        this.allTransportsOfUser = allData

        this.allTransportsOfUser.forEach(
          userTransport => {
            let userTransportMonth = (new Date(userTransport.date)).getMonth()
            let index = this.data.findIndex( element =>
              element.month === userTransportMonth
            );
            if (index !== -1) {
              this.data.at(index)!.emissions += userTransport.calculatedEmissions.co2e
            } else {
              this.data.push({month: userTransportMonth, emissions: userTransport.calculatedEmissions.co2e})
            }
            EmissionChartComponent.sumAllEmissions += userTransport.calculatedEmissions.co2e as number;
          }
        )

        this.data.sort((a,b) => a.month - b.month)

        this.data.forEach(
          data => {
            this.lineChartData.datasets[0].data.push(data.emissions)
            if (DashboardComponent.monthMapping.has(data.month)) {
              let label = DashboardComponent.monthMapping.get(data.month) as string
              this.lineChartData.labels!.push(label)
              this.lineChartLabels.push(label)
            }
          }
        )
        this.chart?.update();
        this.chart?.render();
      }
    )
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Emissions per month (co2e)',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [  ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y:
        {
          position: 'left',
        }
    },

    plugins: {
      legend: { display: true },
      datalabels: {
        formatter: function(value, context) {
          return Math.floor(value*100)/100 + ' co2e'
        },
        align: 'top',
        color: 'black'
      },
    }
  };

  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [DataLabelsPlugin];
  public lineChartLegend = true;
  public lineChartLabels: string[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
