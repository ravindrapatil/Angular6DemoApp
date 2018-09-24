import { Component, Input, OnInit, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges {

  @Input() selectedData: any;
  @Output() hideChart: EventEmitter<any> = new EventEmitter();
  chart: any;

  constructor() { }

  ngOnInit() {

    // this.open = this.selectedData.open;
    // this.close = this.selectedData.close;
    // this.latestTime = this.selectedData.latestTime;

    //this.lineChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedData']) {
      if(this.selectedData == null) {
        return true;
      }
      let newData = this.selectedData;
      let open = newData.open;
      let close = newData.close;
      let latestTime = newData.latestTime;
      let companyName = newData.companyName;
      this.lineChart(open, close, latestTime, companyName);
    }
  }

  private lineChart(open, close, latestTime, companyName) {
    this.chart = new Chart({
      chart: {
        zoomType: 'x'
      },
      title: {
        text: companyName
      },
      subtitle: {
        text: 'Financial Sector'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: latestTime
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      },
      // plotOptions: {
      //   series: {
      //     pointStart: 2010
      //   }
      // },
      series: [
        {
          name: 'Open',
          data: [0, open]
        },
        {
          name: 'Close',
          data: [0, close]
        }
        // ,
        // {
        //   name: 'High',
        //   data: this.high
        // },
        // {
        //   name: 'Low',
        //   data: this.low
        // }
      ]
    });
  }

  public closeChart() {
    this.hideChart.emit(false)
  }

}
