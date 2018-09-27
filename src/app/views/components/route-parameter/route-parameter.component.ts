import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../services/rxjs.service';
import {Router, NavigationExtras} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-route-parameter',
  templateUrl: './route-parameter.component.html',
  styleUrls: ['./route-parameter.component.scss']
})
export class RouteParameterComponent implements OnInit {
  playerList: any;
  playerList1: any;

  constructor(public router: Router, 
    private rxjsService: RxjsService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.rxjsService.fantasySquad().subscribe(res => {
      this.playerList = res.squad[0].players;
      this.spinner.hide();
    }, err => {
      console.log(err);
    })
  }

  private gotoPlayerDetails(pid) {
    console.log(pid);
    let navigationExtras: NavigationExtras = {
      queryParams: {'pid': pid}
    }
    this.router.navigate(['/components/playerdetails'], navigationExtras);
  }

}
