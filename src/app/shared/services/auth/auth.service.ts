import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  
  constructor(private http: HttpClient, public router: Router) { }

  registration(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(API_URL + '/user/signup', user, httpOptions)
      .pipe(
        map((res: Response) => res),
        catchError((res: Response) => this.errorHandler(res))
      );
  }

  login(loginData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(API_URL + '/user/login', loginData, httpOptions)
      .pipe(
        map((res: Response) => res),
        catchError((res: Response) => this.errorHandler(res))
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

  setLoggedIn(value: Boolean) {
    this.loggedInStatus = value;
    sessionStorage.setItem('loggedIn', 'true');
  }

  isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus);
  }

}
