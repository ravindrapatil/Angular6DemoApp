import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { BehaviorsubjectService } from '../../services/behaviorsubject.service';
import { Pharma } from "../../services/pharma"; 


@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss']
})
export class ComponentOneComponent implements OnInit, OnChanges {

  @Input() pharmaListData;
  public gridData: GridDataResult;
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'company', operator: 'contains', value: '' }]
    }
  }
  items: any;
  selectedData: any;

  constructor(private behaviorsubjectService: BehaviorsubjectService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pharmaListData']) {
      if(this.pharmaListData == null){
        return true;
      }
      this.items = this.pharmaListData;
      this.gridData = process(this.items, this.state);
    }
  }

  ngOnInit() {
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.items, this.state);
  }

  public sendPharmaDetail(event) {
    let id = event.selectedRows[0].dataItem._id;
    this.behaviorsubjectService.sendPharmaDetail(id);
  }

  // public passData(par) {
  //   this.behaviorsubjectService.editUser(par);
  // }

}
