import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';
import { Login } from '../../actions/user.action';

import { AuthService } from '../../shared/services/auth/auth.service';
import { SbService } from '../../shared/services/subjectBehaviour/sb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alertsDismiss: any = [];

  constructor(private auth: AuthService, private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private subjectBhvr: SbService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])],
      password: ['', Validators.required]
    });
  }

  login() {
    let loginData = this.loginForm.value;
    console.log(loginData);

    this.store.dispatch(new Login(loginData)).subscribe((res: any) => {
      debugger;
      if (res.users.loggedUserInfo.message == 'Auth Successfull') {
        sessionStorage.setItem('token', res.users.loggedUserInfo.token);
        let userInfo = res.users.loggedUserInfo.userInfo[0];
        sessionStorage.setItem('user', JSON.stringify(userInfo));
        let getUserId = JSON.parse(sessionStorage.getItem('user'));
        let userId = getUserId._id;
        sessionStorage.setItem('userId', userId);
        this.subjectBhvr.passUserInfo(userId);
        this.auth.setLoggedIn(true);
        this.alertsDismiss.push({
          type: 'success',
          msg: `Logged in Successfully :)`,
          timeout: 900
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 900);
      }
    },
    // this.auth.login(loginData).subscribe((res: any) => {
    //   if (res.message == 'Auth Successfull') {
    //     sessionStorage.setItem('token', res.token);
    //     let userInfo = res.userInfo[0];
    //     sessionStorage.setItem('user', JSON.stringify(userInfo));
    //     let getUserId = JSON.parse(sessionStorage.getItem('user'));
    //     let userId = getUserId._id;
    //     sessionStorage.setItem('userId', userId);
    //     this.subjectBhvr.passUserInfo(userId);
    //     this.auth.setLoggedIn(true);
    //     this.alertsDismiss.push({
    //       type: 'success',
    //       msg: `Logged in Successfully :)`,
    //       timeout: 900
    //     });
    //     setTimeout(() => {
    //       this.router.navigate(['/dashboard']);
    //     }, 900);
    //   }
    // },
    (error) => {
      console.log(error);
      if (error.statusCode == 404) {
        this.alertsDismiss.push({
          type: 'danger',
          msg: `Bad request, try after sometime :)`,
          timeout: 5000
        });
      }
      if (error.statusCode == 401) {
        this.alertsDismiss.push({
          type: 'danger',
          msg: `Authorization failed. Try with valid email and password`,
          timeout: 5000
        });
      }
    });
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }

}
