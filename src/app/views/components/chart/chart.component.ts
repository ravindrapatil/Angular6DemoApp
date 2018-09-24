import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart: any = [];
  barchartVar: any = [];
  paichartVar: any = [];
  doughnutCanvas: any = [];
  COLOR_NAMES = ['#d60e56', '#a60ed6', '#1c0ed6', '#0664c7', '#04aba4', '#05c778', '#03c113', '#88c103', '#d88402', '#ef4501'];

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartService.dailyForecast().subscribe(res => {
      this.lineChart(res);
    }, err => {
      console.log(err);
    });

    //Bar Chart
    this.chartService.stockOneYear().subscribe(res => {
      this.barChart(res);
    }, (err) => {
      console.log(err);
    });

    //Pai Chart
    this.chartService.stockMostActive().subscribe(res => {
      this.paiChart(res);
    }, (err) => {
      console.log(err);
    });

    //Doughnut Chart
    this.chartService.stockMostActive().subscribe(res => {
      this.doughnutChart(res);
    }, (err) => {
      console.log(err);
    });
  }

  private lineChart(res) {
    let tempMin = res.financials.map(res => res.cashFlow);
    let tempMax = res.financials.map(res => res.currentCash);
    let totalDebt = res.financials.map(res => res.totalDebt);
    let allDates = res.financials.map(res => res.reportDate);
    let netIncome = res.financials.map(res => res.netIncome);
    let totalRevenue = res.financials.map(res => res.totalRevenue);

    let weatherDates = [];
    allDates.forEach(element => {
      let formatedDate = new Date(element * 1000);
      weatherDates.push(formatedDate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
    });

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: allDates,
        datasets: [
          {
            data: tempMax,
            label: 'Cash Flow',
            borderColor: '#f1578b',
            fill: false
          },
          {
            data: tempMin,
            label: 'Current Cash',
            borderColor: '#ffcc00',
            fill: false
          },
          {
            data: totalDebt,
            label: 'Total Debt',
            borderColor: '#e67a30',
            fill: false
          },
          {
            data: netIncome,
            label: 'Net Income',
            borderColor: '#13af7b',
            fill: false
          },
          {
            data: totalRevenue,
            label: 'Total Revenue',
            borderColor: '#a372f5',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: [{
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }],
        responsive: true
      }
    })
  }

  private barChart(res) {
    let open = res.map(res => res.open);
    let close = res.map(res => res.close);
    let high = res.map(res => res.high);
    let low = res.map(res => res.low);
    let allDates = res.map(res => res.date);

    this.barchartVar = new Chart('barChartCanvas', {
      type: 'bar',
      data: {
        labels: allDates,
        datasets: [
          {
            data: open,
            label: 'Stock Open',
            borderColor: '#3cba9f',
            backgroundColor: '#3cba9f',
            fill: false
          },
          {
            data: close,
            label: 'Stock Close',
            borderColor: '#ffcc00',
            backgroundColor: '#ffcc00',
            fill: false
          },
          {
            data: low,
            label: 'Stock Low',
            borderColor: '#0166bf',
            backgroundColor: '#0166bf',
            fill: false
          },
          {
            data: high,
            label: 'Stock High',
            borderColor: '#01bf9e',
            backgroundColor: '#01bf9e',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: [{
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }],
        responsive: true
      }
    });
  }

  //Pai Chart
  private paiChart(res) {
    let open = res.map(res => res.open);
    let symbol = res.map(res => res.symbol);
    //let bgColor = ['red', 'orange', 'yellow', 'green', 'blue'];

    this.paichartVar = new Chart('paichartCanvas', {
      type: 'pie',
      data: {
        datasets: [
          {
            data: open,
            label: symbol,
            borderColor: '#fff',
            backgroundColor: this.COLOR_NAMES,
            fill: false
          }
        ],
        labels: symbol
      },
      options: {
        legend: {
          display: true
        },
        scales: [{
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }],
        responsive: true
      }
    });
  }

  //Doughnut Chart
  private doughnutChart(res) {
    let open = res.map(res => res.open);
    let companyName = res.map(res => res.companyName) 

    this.doughnutChart = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: open,
            label: companyName,
            borderColor: '#fff',
            backgroundColor: this.COLOR_NAMES,
            fill: false
          }
        ],
        labels: companyName
      },
      options: {
        legend: {
          display: true
        },
        scales: [{
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }],
        responsive: true
      }
    });
  }

}
