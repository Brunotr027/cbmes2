import { Injectable } from '@angular/core';
import { Data } from "../interfaces/dados-relatorio";
import dadosTeste from '../../assets/dados-teste.json';

@Injectable({
  providedIn: 'root'
})
export class InfoChartService {
  data: Data[] = dadosTeste;

  constructor() { }

  public labels(key: string): string[] {
    // @ts-ignore
    return [...new Map(this.data.map(g => [g[key].toString(), g])).keys()];
  }

  public getData(key: string): number[]{
    let data = Array.apply(null, Array(this.labels(key).length)).map(function () { return 0; })

    for(let element of this.data) {
      for(let i = 0; i < this.labels(key).length; i++) {
        // @ts-ignore
        if (element[key].toString() == this.labels(key)[i]) {
          data[i] += 1;
        }
      }
    }

    return data;
  }

  public sumData(key: string, type: string): number{

    // @ts-ignore
    return this.data.filter(data => data[key] == type).reduce(sum => sum + 1, 0);
  }

  public teste() {
    return this.data.map(item => {
      return item.city;
    })
  }

}
