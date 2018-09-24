import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseURL: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = '?search=';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  search2(terms: Observable<string>) {
    return terms.debounceTime(2000)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntities(term));
  }

  searchEntities(term) {
    this.spinner.show();
    return this.http.get(this.baseURL + this.queryUrl + term)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  //Connects with mongooDB 
  searchProducts(queryString: string) {
    return this.http.get(API_URL + '/basicAPI/searchPharma?q=' + queryString)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  errorHandler(res: any) {
    const statusCode = res.status;
    const error = {
      statusCode: statusCode,
      error: res.error.message
    };
    return throwError(error);
  }

}
