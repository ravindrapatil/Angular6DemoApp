import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { mergeMap } from 'rxjs/operators'
import { filter, catchError, map, concat } from 'rxjs/operators'
import { RxjsService } from '../services/rxjs.service';
import { ChartService } from '../services/chart.service';
import { range } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  public gridData: GridDataResult;
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'label', operator: 'contains', value: '' }]
    }
  }
  items: any;

  // RxJs Concat Operator
  public gridData2: GridDataResult;
  public state2: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  }
  items2: any;

  playerList: any;
  pid: any;
  playerDetail: any;
  concatArray: any = [];
  finalMergedArray: any;

  constructor(private rxjsService: RxjsService, private chartService: ChartService) { }

  ngOnInit() {
    this.rxjsService.stockOneYear().subscribe(res => {
      this.items = res;
      this.gridData = process(this.items, this.state);
    })

    // Fantasy Squad
    this.cricketPlayerDetails()

    // Starts RxJs Concat Operator
    const stokeOneYear = this.chartService.stockOneYear();
    const stokeTwoYears = this.chartService.stockTwoYears().pipe(
      map((res: any) => {
        let array_slice = res.filter(item => item.date.includes('2017'));
        let newArray = array_slice.slice(0, 22);
        return newArray;
      })
    );

    stokeOneYear.pipe(concat(stokeTwoYears)).subscribe(res => {
      this.concatArray.push(res);
      let combinedArrays = this.concatArray;
      let arr1 = combinedArrays[0];
      let arr2 = combinedArrays[1];
      this.items2 = arr1.concat(arr2);
      this.gridData2 = process(this.items2, this.state2);
    }, err => {
      console.log(err);
    })
    // Ends RxJs Concat Operator

  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.items, this.state);
  }

  public dataStateChange2(state: DataStateChangeEvent): void {
    this.state2 = state;
    this.gridData2 = process(this.items2, this.state2);
  }

  onKey() {
    this.rxjsService.stockOneYear().subscribe(res => {
      this.items = res;
      this.gridData = process(this.items, this.state);
    })
  }
  
  higherThen(val) {
    this.rxjsService.stockHigherThen(val).subscribe(res => {
      this.items = res;
      this.gridData = process(this.items, this.state);
    })
  }

  lowerThen(val) {
    this.rxjsService.stockLowerThen(val).subscribe(res => {
      this.items = res;
      this.gridData = process(this.items, this.state);
    })
  }

  public cricketPlayerDetails(player?: any) {
    this.rxjsService.fantasySquad()
      .switchMap((res) => {
        this.playerList = res.squad[0].players;
        if(player == undefined) {
          this.pid = res.squad[0].players[0].pid;
        }
        this.pid = player.pid;
        return this.rxjsService.playerStats(this.pid);
      }).subscribe(resp => {
        this.playerDetail = resp;
      }, err => {
        console.log(err);
      })
  }

}
