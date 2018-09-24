import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  URL: string = 'http://cricapi.com/api/';
  query: string = '?apikey=';
  apikey: string = 'NcY6skJ8MyPSDcmgRWpo3b3Vgvn1';

  constructor(private http: HttpClient) { }

  getDataFromTwoResources() {
    let url1 = this.http.get('https://api.iextrading.com/1.0/stock/aapl/chart')
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );

    let url2 = this.http.get('https://api.iextrading.com/1.0/stock/aapl/effective-spread')
        .pipe(
          map((res: any) => res),
          catchError((res: any) => this.errorHandler(res))
        )

    return Observable.forkJoin([url1, url2]);
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
