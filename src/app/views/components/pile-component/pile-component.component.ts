import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-pile-component',
  templateUrl: './pile-component.component.html',
  styleUrls: ['./pile-component.component.scss']
})
export class PileComponentComponent implements OnInit {

  today = new Date();
  timestamp: string;
  birthday = new Date(1988, 3, 15);
  toggle = true;
  price = 153478;
  decimalValue = "3.14159265"
  searchText: any;

  dummyObj = [{
    firstName: 'rickky',
    lastName: 'Pointing',
    country: 'Austrelia',
    profession: 'Cricketer'
  }, {
    firstName: 'bret',
    lastName: 'Lee',
    country: 'Austrelia',
    profession: 'Cricketer'
  }]

  imageUrl: string = '';
  imageUrl2: string = 'assets/img/avatars/5.jpg';

  truncateString = "So I need to create a pipe that causes a text box to only display the first 150 characters of the description and if its shorter just display the whole description and the preview of the description has to end with (...). There may be a CSS solution, but if you are serious about a custom pipe, you can try something like this.";
  multiplyArray = [2, 3, 4, 5, 6];
  multiplyBy = 100;
  companyList: any;
  people:any = [];
  peopleFilter: any;
  inputvalue: any;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    let timestamp1 = new Date(1382086394000);
    this.timestamp = timestamp1.toDateString();
    this.getDataForFilterPipe();
  }

  get format() {
    return this.toggle ? 'shortDate' : 'fullDate'
  }
  toggleFormat() {
    this.toggle = !this.toggle
  }

  public getDataForFilterPipe(){
    this.chartService.stockMostActive().subscribe(res => {
      this.companyList = res;
    }, err => {
      console.log(err);
    })
  }

}
