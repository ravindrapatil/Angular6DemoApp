import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { ChartService } from '../services/chart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChildThirdComponent } from './child-third/child-third.component';
import { BehaviorsubjectService } from '../services/behaviorsubject.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  public gridData: GridDataResult;
  public state: State = {
    skip: 0,
    take: 5,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'companyName', operator: 'contains', value: '' }]
    }
  }
  items: any;
  pharmaList: any;
  selectedData: any;
  showchart = false;
  count: any = 0;
  @ViewChild(ChildThirdComponent) childThird: ChildThirdComponent;

  constructor(private chartService: ChartService, 
    private behaviorsubjectService: BehaviorsubjectService) { }

  ngOnInit() {
    this.chartService.stockMostActive().subscribe((res) => {
      this.items = res;
      this.gridData = process(this.items, this.state);
    }, (err) => {
      console.log(err);
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.items, this.state);
  }

  public onSelect(event) {
    this.selectedData = event.selectedRows[0].dataItem;
    this.showchart = true;
  }

  hideChartHandler(event) {
    this.showchart = event;
    console.log(event + " - " + this.showchart);
  }

  // For Third child component
  public increment() {
    this.childThird.increment();
  }

  public decrement() {
    this.childThird.decrement();
  }

  // For SubjectBehaviour
  public getPharmaList() {
    this.behaviorsubjectService.getPharmaList().subscribe(res => {
      this.pharmaList = res.products
    }, err => {
      console.log(err);
    })
  }

  

}
