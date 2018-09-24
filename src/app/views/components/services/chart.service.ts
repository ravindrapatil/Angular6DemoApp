import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { throwError, range } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  dailyForecast() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/financials', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  stockOneYear() {
    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/chart')
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  stockMostActive() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('https://api.iextrading.com/1.0/stock/market/list/gainers', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  stockMostEffectiveSpread() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/effective-spread', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  stockTwoYears() {
    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/chart/2y')
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
