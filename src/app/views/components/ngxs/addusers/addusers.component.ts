import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUser, AddToCart } from '../../../../actions/user.action';
import { reject } from 'q';
import { resolve } from 'q';
import {Router, NavigationExtras} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerSideDataService } from '../../services/server-side-data.service';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.scss']
})
export class AddusersComponent implements OnInit {

  name: any;
  email: any;
  formLabel: any;
  products: any;
  count: any;

  constructor(private store: Store, 
    public router: Router, 
    private productsSvc: ServerSideDataService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.formLabel = this.store.select(state => state.users.formLabel);
    this.store.select(state => state.users.productList).subscribe(res => {
      this.count = res.length;
    });
    this.productsSvc.getAllShopingProducts().subscribe(res => {
      if(res.status == 200) {
        this.products = res.products;
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
  }

  addUser(name, email) {
    console.log("Username and email " + name + " - " + email);
    this.store.dispatch(new AddUser({name, email}));
  }

  addToCart(product) {
    console.log(product);
    this.store.dispatch(new AddToCart(product));

    this.store.select(state => state.users.productList).subscribe(res => {
      this.count = res.length;
    });
  }

  gotoCartDetails() {
    this.router.navigate(['/components/cart']);
  }

  // addPromise() {
  //   let promiseData = new Promise((resolve, reject) => {
  //     let z = 10;
  //     if(z == 10) {
  //       resolve(z)
  //     } else {
  //       reject('Error')
  //     }
  //   });

  //   let promiseData2 = new Promise((resolve, reject) => {
  //     let z = 100;
  //     if(z == 100) {
  //       resolve(z)
  //     } else {
  //       reject('Error')
  //     }
  //   });

  //   promiseData.then(res => {
  //     console.log("Result from promise 1 " + res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

  //   Promise.all([promiseData, promiseData2]).then(res => {
  //     console.log("Result from all promises " + res[0]);
  //     console.log("Result from all promises " + res[1]);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })


  // }

}
