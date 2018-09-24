import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, public router: Router) { }

  addProfile(profileBody, userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': null,
        'Accept': 'multipart/form-data'
        // 'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    return this.http.post(API_URL + '/profile/' + userId, profileBody, httpOptions)
      .pipe(
        map((resp: Response) => resp),
        catchError((resp: Response) => this.errorHandler(resp))
      );
  }

  getProfile(userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/profile/' + userId, httpOptions)
      .pipe(
        map((res: Response) => res),
        catchError((res: Response) => this.errorHandler(res))
      );
  }

  updateProfile(updatedBody, userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.patch(API_URL + '/profile/' + userId, updatedBody, httpOptions)
      .pipe(
        map((res: Response) => res),
        catchError((res: Response) => this.errorHandler(res))
      );
  }


  getPharmaProducts(pages) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/profile/pharma/' + pages, httpOptions)
      .pipe(
        map((res: any) => res),
        catchError((res: any) => this.errorHandler(res))
      );
  }

  getOneUsersByID(userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get(API_URL + '/user/' + userId, httpOptions)
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
