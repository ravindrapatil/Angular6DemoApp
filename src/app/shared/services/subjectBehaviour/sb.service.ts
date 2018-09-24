import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SbService {
  userDetails = new BehaviorSubject<string>('Ravindra');
  myUser = this.userDetails.asObservable();

  constructor() { }

  passUserInfo(updatedInfo) {
    this.userDetails.next(updatedInfo);
  }

}
