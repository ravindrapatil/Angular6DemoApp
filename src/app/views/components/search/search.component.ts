import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Subject } from 'rxjs/Subject';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any;
  searchTerm$ = new Subject<string>();
  showMsg: boolean = false;

  mResults: any[] = [];
  queryField: FormControl = new FormControl();
  totalItems: any;
  itemsPerPage: any;
  currentPage: number = 1;

  constructor(private searchService: SearchService, private spinner: NgxSpinnerService) {
    
  }

  ngOnInit() {
    this.queryField.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(query => {
        const queryVal = query.trim(); 
        this.spinner.show();
        return this.searchService.searchProducts(query)
      })
      .subscribe(res => {
        this.spinner.hide();
        if (res.message == 'Search Result') {
          this.mResults = res.result;
          console.log(this.mResults);
          this.totalItems = res.count;
          this.itemsPerPage = 10;
          this.currentPage = this.currentPage;
          // this.setPage(this.currentPage);
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      });

      // General Search

      this.searchService.search2(this.searchTerm$).subscribe(res => {
        this.spinner.show();
        this.showMsg = false;
        if (res) {
          this.spinner.hide();
        }
        this.results = res.results;
        if (this.results.length == 0) {
          this.showMsg = true;
        }
      })
  }

  // public setPage(page: number) {
  //   this.mResults = this.mResults.slice(page, 10)
  // }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    // this.mResults = this.mResults;
    // this.currentPage = (this.currentPage * this.itemsPerPage) - this.currentPage;
    // this.mResults = this.mResults.slice(20, 10);
    // this.setPage(2);
  }

}
