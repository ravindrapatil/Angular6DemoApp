import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ServerSideDataService {

  constructor(private http: HttpClient) { }

  getPharmaProducts(pages, itemsToDisplay) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/basicAPI/pharma/' + pages + '/' + itemsToDisplay, httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  getPharmaFiltred(searchText, itemsToDisplay, totalNoOfItems) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/basicAPI/filter/' + searchText + '/' + itemsToDisplay + "/" + totalNoOfItems, httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  // Get all Pharma Products
  getAllPharmaProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/basicAPI/pharmaproducts', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  // Delete Pharma Products
  deletePharmaProduct(prodId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.delete(API_URL + '/basicAPI/deletePharmaProduct/' + prodId, httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  // Update the Pharma Product
  updatePharmaProduct(prodId, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.patch(API_URL + '/basicAPI/updatePharmaProduct/' + prodId, body, httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  // Add or create new Pharma Product
  newPharmaProduct(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(API_URL + '/basicAPI/addNewPharmaProduct', body, httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  // Get Shoping cart products
  getAllShopingProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/products', httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  // Place an Order
  placeOrder(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(API_URL + '/orders', body, httpOptions)
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
