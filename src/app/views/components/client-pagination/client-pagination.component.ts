import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { ServerSideDataService } from '../services/server-side-data.service';
import { process, State } from '@progress/kendo-data-query';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client-pagination',
  templateUrl: './client-pagination.component.html',
  styleUrls: ['./client-pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit {

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
  private editedRowIndex: number;
  public formGroup: FormGroup;

  constructor(private serversideDataService: ServerSideDataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadPharmaData();
  }

  private loadPharmaData() {
    this.spinner.show();
    this.serversideDataService.getAllPharmaProducts().subscribe(res => {
      this.spinner.hide();
      this.items = res.products;
      this.gridData = process(this.items, this.state);
    }, err => {
      console.log(err);
    })
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.items, this.state);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'company': new FormControl('', Validators.required),
      'drugname': new FormControl('', Validators.required),
      'genericname': new FormControl('', Validators.required),
      'code': new FormControl('', Validators.required),
      'description': new FormControl(),
      'nhsnumber': new FormControl('', Validators.required)
    })
    sender.addRow(this.formGroup);
  }

  public removeHandler(dataItem) {
    this.serversideDataService.deletePharmaProduct(dataItem.dataItem._id).subscribe(res => {
      if (res.message == "Product removed successfully") {
        this.loadPharmaData();
      }
    }, err => {
      console.log(err);
    })
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'company': new FormControl(dataItem.company, Validators.required),
      'drugname': new FormControl(dataItem.drugname, Validators.required),
      'genericname': new FormControl(dataItem.genericname, Validators.required),
      'code': new FormControl(dataItem.code, Validators.required),
      'description': new FormControl(dataItem.description),
      'nhsnumber': new FormControl(dataItem.nhsnumber, Validators.required)
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew, dataItem }) {
    this.spinner.show();
    if (dataItem._id == undefined) {
      console.log("Nothing Happens");
      const product = formGroup.value;
      this.serversideDataService.newPharmaProduct(product).subscribe(res => {
        if (res.message == "New Product added") {
          this.spinner.hide();
          this.loadPharmaData();
        }
      }, err => {
        console.log(err);
      });
    } else {
      const product = formGroup.value;
      this.serversideDataService.updatePharmaProduct(dataItem._id, product).subscribe(res => {
        if (res.message == "Product updated Successfully") {
          this.loadPharmaData();
        }
      }, err => {
        console.log(err);
      });
    }
    sender.closeRow(rowIndex);
  }

  public closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
