import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {
  chart: any;
  stackedArea: any;
  columnArea: any;
  piaChartArea: any;
  combinationChartArea: any;
  open: any;
  close: any;
  allDates: any;
  totalRevenue: any;
  volume: any;
  high: any;
  low: any;
  openActive: any;
  closeActive: any;
  highActive: any;
  lowActive: any;
  allDatesActive: any;
  companyName: any;
  marketCap: any;
  dataforpiaChart: { name: string; y: number; }[];
  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartService.stockOneYear().subscribe(res => {
      this.open = res.map(res => res.open);
      this.close = res.map(res => res.close);
      this.high = res.map(res => res.high);
      this.low = res.map(res => res.low);
      this.allDates = res.map(res => res.date);
      this.volume = res.map(res => res.volume);
      this.lineChart();
      this.stackedAreaChart();
    }, err => {
      console.log(err);
    });

    this.chartService.stockMostActive().subscribe(res => {
      console.log(res);
      this.openActive = res.map(res => res.open);
      this.closeActive = res.map(res => res.close);
      this.highActive = res.map(res => res.high);
      this.lowActive = res.map(res => res.low);
      this.allDatesActive = res.map(res => res.latestTime);
      this.companyName = res.map(res => res.companyName);
      this.marketCap = res.map(res => res.marketCap);

      this.dataforpiaChart = []
      res.map(item => {
        let obj = {
          name: item.companyName,
          y: item.marketCap
        };
        this.dataforpiaChart.push(obj);
      })

      this.columnAreaChart();
      this.piaAreaChart();
      this.combinationChart();
    }, (err) => {
      console.log(err);
    });
  }

  private lineChart() {
    this.chart = new Chart({
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Stocks - 2018'
      },
      subtitle: {
        text: 'Financial Sector'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.allDates
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
      plotOptions: {
        series: {
          pointStart: 2010
        }
      },
      series: [
        {
          name: 'Open',
          data: this.open
        },
        {
          name: 'Close',
          data: this.close
        },
        {
          name: 'High',
          data: this.high
        },
        {
          name: 'Low',
          data: this.low
        }
      ]
    });
  }

  //Stacked Area Chart
  private stackedAreaChart() {
    this.stackedArea = new Chart({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Stocks - 2018'
      },
      subtitle: {
        text: 'Financial Sector'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.allDates
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
      tooltip: {
        split: true,
        valueSuffix: ' millions'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [
        {
          name: 'Open',
          data: this.open
        },
        {
          name: 'Close',
          data: this.close
        },
        {
          name: 'High',
          data: this.high
        },
        {
          name: 'Low',
          data: this.low
        }
      ]
    });
  }

  // Column Area Chart
  private columnAreaChart() {
    this.columnArea = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Stocks - 2018'
      },
      subtitle: {
        text: 'Financial Sector'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.allDatesActive
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
      tooltip: {
        split: true,
        valueSuffix: ' millions'
      },
      series: [
        {
          name: 'Open',
          data: this.openActive
        },
        {
          name: 'Close',
          data: this.closeActive
        },
        {
          name: 'High',
          data: this.highActive
        },
        {
          name: 'Low',
          data: this.lowActive
        }
      ]
    });
  }

  //Pia Area Chart 
  private piaAreaChart() {
    this.piaChartArea = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Stocks - 2018'
      },
      subtitle: {
        text: 'Financial Sector'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        // : <b>{point.percentage:.1f}%</b>
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        data: this.dataforpiaChart
      }]
    })
  }

  // Combination Chart
  private combinationChart() {
    this.combinationChartArea = new Chart({
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Combination: Dual column, spline'
      },
      xAxis: [{
        categories: this.allDatesActive
      }],
      yAxis: [{ // Primary yAxis
        title: {
          text: 'Open Active'
        }
      }, { // Secondary yAxis
        title: {
          text: 'Close Active'
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true
      },
      series: [{
        name: 'Open Active',
        type: 'column',
        yAxis: 1,
        data: this.openActive
      }, {
        name: 'Close Active',
        type: 'spline',
        data: this.closeActive
      }]


    })
  }

}
