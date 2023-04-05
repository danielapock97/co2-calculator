import {Component, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-user-input-chart',
  templateUrl: './user-input-chart.component.html',
  styleUrls: ['./user-input-chart.component.css']
})
export class UserInputChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration<"bar" & "bar" & "bar", Array<number | [number, number] | null>, unknown>["options"]  = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType:  ChartConfiguration<"bar" & "bar", Array<number | [number, number] | null>, unknown>["type"] = 'bar';
  public barChartPlugins = [
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }
}
