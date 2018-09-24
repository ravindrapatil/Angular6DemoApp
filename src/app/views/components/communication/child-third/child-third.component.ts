import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-third',
  templateUrl: './child-third.component.html',
  styleUrls: ['./child-third.component.scss']
})
export class ChildThirdComponent implements OnInit {
  count: any = 0;
  constructor() { }

  ngOnInit() {
  }

  public increment(){
    this.count++;
  }

  public decrement(){
    this.count--;
  }

}
