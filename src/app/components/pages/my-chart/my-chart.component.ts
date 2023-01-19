import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { InfoChartService } from "../../../services/info-chart.service";

Chart.register(...registerables);

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss'],
})
export class MyChartComponent implements OnInit {

  constructor(private infoCharts: InfoChartService) {}

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(){
    const labels = this.infoCharts.labels('role');

    new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: ' ',
          data: this.infoCharts.getData('role'),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 6
        }]
      },
    });
  }

}
