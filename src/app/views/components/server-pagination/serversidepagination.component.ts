import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerSideDataService } from '../services/server-side-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-serversidepagination',
  templateUrl: './serversidepagination.component.html',
  styleUrls: ['./serversidepagination.component.scss']
})
export class ServersidepaginationComponent implements OnInit {
  alertsDismiss: any = [];
  productArray: any = [];
  totalItems: number;
  currentPage: number = 1;
  smallnumPages: number;
  itemsPerPage: any;
  noOfItemsToDisplay: any [];
  itemsToDisplay: any;
  @ViewChild('searchField') searchInputField: ElementRef;
  searchText: any;
  showNoRecordMsg: boolean = false;

  constructor(private serversideDataService: ServerSideDataService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.noOfItemsToDisplay = [10, 15, 20, 25];
    this.selectNoItemsToDisplay();
  }

  selectnoOfPages(event) {
    this.itemsToDisplay = event;
    this.selectNoItemsToDisplay();  
  }

  selectNoItemsToDisplay() {
    this.spinner.show();
    this.serversideDataService.getPharmaProducts(this.currentPage, this.itemsToDisplay).subscribe(res => {
      this.totalItems = res.count;
      if(this.totalItems == 0) {
        this.showNoRecordMsg = true;
      }
      console.log(this.totalItems);
      this.itemsPerPage = res.perPage;
      this.productArray = res.products;
      this.spinner.hide();
    }, (error) => {
      if (error.statusCode == 404) {
        this.alertsDismiss.push({
          type: 'danger',
          msg: `Bad request, try after sometime :)`,
          timeout: 5000
        });
      }
      if (error.statusCode == 401) {
        this.alertsDismiss.push({
          type: 'danger',
          msg: `Authorization failed. Try with valid email and password`,
          timeout: 5000
        });
      }
    })
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.serversideDataService.getPharmaProducts(event.page, this.itemsToDisplay).subscribe(res => {
      console.log(res)
      this.totalItems = res.count;
      this.itemsPerPage = res.perPage;
      this.productArray = res.products;
    }, (err) => {
      console.log(err)
    })
  }

  OnSearchTextChanges(event) {
    console.log(event.target.value);
    this.searchText = event.target.value;
  }

  search() {
    this.serversideDataService.getPharmaFiltred(this.searchText, this.currentPage, this.itemsToDisplay).subscribe(res =>{
      this.totalItems = res.count;
      this.itemsPerPage = res.perPage;
      this.productArray = res.products;
    }, err => {
      console.log(err);
    })
  }

}
