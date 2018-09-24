import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter, catchError, map, mergeMap } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  constructor(private http: HttpClient) { }

  stockOneYear() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/chart', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  stockHigherThen(val) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/chart', httpOptions)
      .pipe(
        map((res: any) => {
          return res.filter(items => items.high >= val)
        }),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  stockLowerThen(val) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('https://api.iextrading.com/1.0/stock/aapl/chart', httpOptions)
      .pipe(
        map((res: any) => {
          return res.filter(items => items.low <= val)
        }),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  fantasySquad() {
    let uid = {
      unique_id : "1034809"
    }
    return this.http.post('https://cricapi.com/api/fantasySquad?apikey=NcY6skJ8MyPSDcmgRWpo3b3Vgvn1', uid)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  playerStats(pidNum) {
    let pidObj = {
      pid : pidNum
    }
    return this.http.post("https://cricapi.com/api/playerStats?apikey=NcY6skJ8MyPSDcmgRWpo3b3Vgvn1", pidObj)
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
