import { Component, OnInit } from '@angular/core';
import { InfoChartService } from "../../../services/info-chart.service";
import { MyChartComponent } from "../my-chart/my-chart.component";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

// ..ao clicar: gerar grafico das pessoas por role daquele lugar

export class MapsComponent implements OnInit {
  teste1: any = "";
  constructor(private infoCharts: InfoChartService) {}

  ngOnInit(): void {
    this.renderMapInfo();
  }

  renderMapInfo() {
    const cities = document.getElementsByClassName("municipio");

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const text = city.getElementsByTagName("text")[0];

      text.innerHTML = this.getData(city.getAttribute("mtxTooltip")!);

    city.addEventListener("click", () => {
      let teste2 = text.innerHTML;


      this.teste1 = teste2;

//      let container = document.getElementById("container");
//      container?.classList.toggle("hide");


     });
//      console.log(city.addEventListener("click", function() {
//       console.log(city);
//       }));
    }
  }

  getData(val: string): string {
    return String(this.infoCharts.sumData("city", val));
  }

  getTeste() {
    return this.infoCharts.teste();
  }

}
