import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {UserTransportService} from "../../../services/user-transport.service";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {UserTransport} from "../../../entities/user-transport";
import {EmissionsChartData} from "../../../entities/emissions-chart-data";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import {AdminDashboardComponent} from "../../adminDashboard/admin-dashboard.component";

@Component({
  selector: 'app-admin-emission-chart',
  templateUrl: './admin-emission-chart.component.html',
  styleUrls: ['./admin-emission-chart.component.css']
})
export class AdminEmissionChartComponent implements OnInit{
  allTransportsOfUser: UserTransport[] = [];
  dataAllEmissions: EmissionsChartData[] = [];
  public static sumAllEmissions: number = 0;
  dataPerTransport: EmissionsChartData[] = []
  constructor(private transportUserService: UserTransportService) {
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
      },
      {
        data: [],
        label: 'Subway',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(153, 102, 255, 0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Automobile',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Bicycle',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Bus',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        pointBackgroundColor: 'rgba(255, 206, 86, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 206, 86, 0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Taxi',
        backgroundColor: 'rgba(75, 192, 192,0.2)',
        borderColor: 'rgba(75, 192, 192,1)',
        pointBackgroundColor: 'rgba(75, 192, 192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Van',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 159, 64, 0.8)',
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

  ngOnInit() {
    this.transportUserService.get().subscribe(
      allData => {
        this.allTransportsOfUser = allData
        this.addDataLineAllEmissions()

        AdminDashboardComponent.transportIdMapping.forEach((value: string, key: string) =>
          {this.addDataLinePerTransport(key)}
        )

        this.chart?.update();
        this.chart?.render();
      }
    )
  }

  addDataLineAllEmissions() {
    this.dataAllEmissions = this.setEmptyMonthInDataset()

    this.allTransportsOfUser.forEach(

    userTransport => {
        let userTransportMonth = ((new Date(userTransport.date)).getMonth()+1)
        let index = this.dataAllEmissions.findIndex(element =>
          element.month === userTransportMonth
        );
        if (index !== -1) {
          this.dataAllEmissions.at(index)!.emissions += userTransport.calculatedEmissions.co2e
        } else {
          console.log(new Date(userTransport.date).getMonth())
        }
        AdminEmissionChartComponent.sumAllEmissions += userTransport.calculatedEmissions.co2e as number;
      }
    )

    this.dataAllEmissions.sort((a, b) => a.month - b.month)

    this.dataAllEmissions.forEach(
      data => {
        this.lineChartData.datasets[0].data.push(data.emissions)
        if (DashboardComponent.monthMapping.has(data.month)) {
          let label = DashboardComponent.monthMapping.get(data.month) as string
          this.lineChartData.labels!.push(label)
          this.lineChartLabels.push(label)
        }
      }
    )
  }

  addDataLinePerTransport(transportID: string) {
    let filteredData = this.allTransportsOfUser.filter(
      (element) => element.transportID === transportID
    )
    this.dataPerTransport = this.setEmptyMonthInDataset();

    filteredData.forEach(
      userTransport => {
        let userTransportMonth = ((new Date(userTransport.date)).getMonth() + 1)
        let index = this.dataPerTransport.findIndex(element =>
          element.month === userTransportMonth
        );
        if (index !== -1) {
          this.dataPerTransport.at(index)!.emissions += userTransport.calculatedEmissions.co2e
        } else {
          this.dataPerTransport.push({month: userTransportMonth, emissions: userTransport.calculatedEmissions.co2e})
        }
      }
    )

    this.dataPerTransport.sort((a, b) => a.month - b.month)

    let dataset: any = {
      data: [],
      label: '',
    }
    this.dataPerTransport.forEach(
      data => {
        dataset.data.push(data.emissions)
      }
    )
    let label = AdminDashboardComponent.transportIdMapping.get(transportID)
    let datasetIndex = this.lineChartData.datasets.findIndex(
      dataset => dataset.label === label
    )
    this.lineChartData.datasets.at(datasetIndex)!.data = (dataset.data)
    this.lineChartData.datasets.at(datasetIndex)!.hidden = true

    this.chart?.update();
    this.chart?.render();
  }

  setEmptyMonthInDataset(): EmissionsChartData[] {
    let dataset: EmissionsChartData[] = [];
    AdminDashboardComponent.monthMapping.forEach((value: string, key: number) => {
      dataset.push({emissions: 0, month: key} as EmissionsChartData)
    })
    return dataset;
  }
}
