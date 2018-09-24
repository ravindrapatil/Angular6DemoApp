import { Component, OnInit } from '@angular/core';
import { BehaviorsubjectService } from '../../services/behaviorsubject.service';
import { Pharma } from "../../services/pharma"; 

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.scss']
})
export class ComponentTwoComponent implements OnInit {

  pharmaDetail: any;
  company: any;
  drugname: any;
  genericname: any;
  nhsnumber: any;
  constructor(private behaviorsubjectService: BehaviorsubjectService) { }

  ngOnInit() {
    this.behaviorsubjectService.getPharmaDetail().subscribe(res => {
      this.pharmaDetail = res;
      if(this.pharmaDetail == null) {
        return true;
      }
      this.company = this.pharmaDetail.company;
      this.drugname = this.pharmaDetail.drugname;
      this.genericname = this.pharmaDetail.genericname;
      this.nhsnumber = this.pharmaDetail.nhsnumber;
      
    }, err => {
      console.log(err);
    })
  }

}
