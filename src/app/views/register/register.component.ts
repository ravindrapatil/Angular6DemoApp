import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  alertsDismiss: any = [];
  dismissible = true;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])],
      password: ['', Validators.required]
    });
  }

  register() {
    const userObj = this.registerForm.value;
    this.auth.registration(userObj).subscribe((res: any) => {
      if (res.message == 'User created') {
        this.alertsDismiss.push({
          type: 'success',
          msg: `Account is created. You will be redirected to login page :)`,
          timeout: 2000
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    }, (error) => {
      if (error.statusCode == 409) {
        this.alertsDismiss.push({
          type: 'danger',
          msg: `Email already exists`,
          timeout: 5000
        });
      }
      if (error.statusCode == 404) {
        this.alertsDismiss.push({
          type: 'danger',
          msg: `Bad request, try after sometime :)`,
          timeout: 5000
        });
      }
    });
  }

}
