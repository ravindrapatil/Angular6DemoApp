import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';

import { AjaxService } from '../services/ajax.service';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.scss']
})
export class AjaxComponent implements OnInit {

  dataFromRequest1: any; 
  dataFromRequest2: any;
  public gridData: GridDataResult;
  public gridData2: GridDataResult;

  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'label', operator: 'contains', value: '' }]
    }
  }

  public state2: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'venueName', operator: 'contains', value: '' }]
    }
  }

  items: any;
  items2: any;
  userProfile: Response;
  firstname: any;
  lastname: any;
  address: any;
  phone: any;
  email: any;
  dob: any;

  constructor(private ajaxService: AjaxService,
      private profileService: ProfileService) { }

  ngOnInit() {
    // Parallel API calls
    this.ajaxService.getDataFromTwoResources().subscribe(responseList => {
      this.dataFromRequest1 = responseList[0];
      this.dataFromRequest2 = responseList[1];

      this.items = this.dataFromRequest1;
      this.gridData = process(this.items, this.state);

      this.items2 = this.dataFromRequest2;
      this.gridData2 = process(this.items2, this.state);
    })

    // Sequestial API calls
    this.profileService.getOneUsersByID(sessionStorage.getItem('userId')).switchMap(res => {
      return this.profileService.getProfile(res.individualUser._id);
    }).subscribe((resp: any) => {
      console.log(resp);
      this.firstname = resp.profiles[0].firstname;
      this.lastname = resp.profiles[0].lastname;
      this.address = resp.profiles[0].address;
      this.phone = resp.profiles[0].phone;
      this.email = resp.profiles[0].user.email;
      this.dob = resp.profiles[0].dob;
    }, err => {
      console.log(err);
    })
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.items, this.state);
  }

  public dataStateChange2(state: DataStateChangeEvent): void {
    this.state2 = state;
    this.gridData2 = process(this.items2, this.state2);
  }

}


// ng g c department-details -it -is 
// it -> for inline template
// is -> for inline style