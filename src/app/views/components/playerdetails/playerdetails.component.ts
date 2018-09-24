import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxjsService } from '../services/rxjs.service';
import {Router, NavigationExtras} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.scss']
})
export class PlayerdetailsComponent implements OnInit {
  playerInfo: any;
  odis: any;
  tests: any;
  t20is: any;
  odisbowling: any;
  testsbowling: any;
  t20isbowling: any;

  constructor(private route: ActivatedRoute, 
    public router: Router, 
    private rxjsService: RxjsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.queryParams.subscribe(data => {
      this.rxjsService.playerStats(data.pid).subscribe(res => {
        this.playerInfo = res;
        this.spinner.hide();
        this.odis = res.data.batting.ODIs;
        this.tests = res.data.batting.tests;
        this.t20is = res.data.batting.T20Is;
        this.odisbowling = res.data.bowling.ODIs;
        this.testsbowling = res.data.bowling.tests;
        this.t20isbowling = res.data.bowling.T20Is;
      })
    })
  }

  public gotoPlayersList() {
    this.router.navigate(['/components/routerparameter']);
  }

}
