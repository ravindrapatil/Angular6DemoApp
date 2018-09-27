import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User } from '../../../../models/User';
import { UserState } from '../../../../state/user.state';
import { Observable } from 'rxjs';
import {Router, NavigationExtras} from '@angular/router';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RemoveUser, RemoveFromCart, UpdateCart, ClearProduct } from '../../../../actions/user.action';
import { ServerSideDataService } from '../../services/server-side-data.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {

  users: Observable<User>;
  label: any;
  productsInCart: any = [];
  quantityField: FormControl = new FormControl();
  totalPriceForItem: number;
  subTotal: any;

  constructor(private store: Store, public router: Router, 
    private productsSvc: ServerSideDataService,
    private spinner: NgxSpinnerService) {
    // this.users = this.store.select(state => state.users.users);
    // this.label = this.store.select(state => state.users.filerts);
  }

  ngOnInit() {
    this.store.select(state => state.users.productList).subscribe(res => {
      this.productsInCart = res;
      this.subTotal = this.productsInCart.map(item => item.total).reduce((a, b) => a + b, 0);
    })
  }

  gotoProducts() {
    this.router.navigate(['/components/ngxs']);
  }

  removeFromCart(cart) {
    console.log(cart);
    this.store.dispatch(new RemoveFromCart(cart));
    this.subTotal = this.productsInCart.map(item => item.total).reduce((a, b) => a + b, 0);
    console.log("Sub total " + this.subTotal);
  }

  delUser(name) {
    this.store.dispatch(new RemoveUser(name));
  }

  updateProduct(cart, event) {
    // console.log("Cart info " + JSON.stringify(cart));
    // console.log("Quantity " + event.target.value);
    // console.log("Total " + event.target.value * cart.price);
    let total = event.target.value * cart.price;
    cart.total = total;
    console.log(cart);
    this.store.dispatch(new UpdateCart(cart))
    this.subTotal = this.productsInCart.map(item => item.total).reduce((a, b) => a + b, 0);
    // console.log("Sub total " + this.subTotal);
  }

  placeOrder() {
    this.spinner.show();
    this.productsInCart.map(item => {
      delete item._id;
      console.log(item);
      this.productsSvc.placeOrder(item).subscribe(res => {
        if(res.status == 200) {
          this.spinner.hide();
          this.store.dispatch(new ClearProduct(res));
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      })
    })
  }

}
