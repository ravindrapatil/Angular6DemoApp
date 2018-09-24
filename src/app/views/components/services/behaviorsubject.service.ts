import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pharma } from "./pharma"; 


const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class BehaviorsubjectService {

  private pharmaDetailSubject = new BehaviorSubject<any>(null);
  dataa: any;

  constructor(private http: HttpClient) { }

  editUser(newUser) {
    this.pharmaDetailSubject.next(newUser);
  }

  getPharmaList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(API_URL + '/basicAPI/pharmaproducts', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  sendPharmaDetail(prodId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.get(API_URL + "/basicAPI/getPharmaDetails/" + prodId, httpOptions)
      .subscribe((res: any) => {
        console.log(res);
        this.dataa = res.product[0];
        this.pharmaDetailSubject.next(this.dataa);
      }, err => {
        console.log(err);
      });
  }

  getPharmaDetail() {
    return this.pharmaDetailSubject.asObservable();
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
