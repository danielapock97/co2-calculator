import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import {TransportUserService} from "../../../services/transport-user.service";
import {TransportUser} from "../../../entities/transport-user";
import {UserTransportData} from "../../../entities/user-transport-data";
import {DashboardComponent} from "../../dashboard/dashboard.component";

@Component({
  selector: 'app-transport-modes-chart',
  templateUrl: './transport-modes-chart.component.html',
  styleUrls: ['./transport-modes-chart.component.css']
})
export class TransportModesChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  allTransportsOfUser: TransportUser[] | undefined;
  data: UserTransportData[] = []
  public static sumAllUsagesOfTransport: number = 0;

  public pieChartOptions: ChartConfiguration<"pie">["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: function(value, context) {
          return value + ' km\n' +
          Math.floor(value / TransportModesChartComponent.sumAllUsagesOfTransport *100 *100)/100 + ' %'
        }
      },
    },
  };

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
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
      ],
      hoverOffset: 4,
      borderAlign: 'inner'
    }]
  };
  public pieChartType: ChartConfiguration<"pie", number[], string | string[]>["type"] = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];
  public pieChartLabels: string[] = [];
  public pieChartLegend = true;


  constructor(private transportUserService: TransportUserService) {
  }

  ngOnInit() {
    this.transportUserService.getTransportsByUser(DashboardComponent.user.id).subscribe(
      allData => {
        this.allTransportsOfUser = allData

        this.allTransportsOfUser.forEach(
          userTransport => {
            let index = this.data.findIndex( element =>
              element.transportID === userTransport.transportID
            );
            if (index !== -1) {
              this.data.at(index)!.km += Number(userTransport.distance_km);
            } else {
              this.data.push({transportID: userTransport.transportID, km: Number(userTransport.distance_km)})
            }
            TransportModesChartComponent.sumAllUsagesOfTransport = (Number(TransportModesChartComponent.sumAllUsagesOfTransport)) + (Number(userTransport.distance_km));
          }
        )

        this.data.forEach(
          data => {
            this.pieChartData.datasets[0].data.push(data.km)
            if (DashboardComponent.transportIdMapping.has(data.transportID)) {
              let label = DashboardComponent.transportIdMapping.get(data.transportID) as string
              this.pieChartData.labels!.push(label)
              this.pieChartLabels.push(label)
            }
          }
        )
        this.chart?.update();
        this.chart?.render();
      }
    )
  }
}