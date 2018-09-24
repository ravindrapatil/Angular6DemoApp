import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-custom-directive',
  templateUrl: './custom-directive.component.html',
  styleUrls: ['./custom-directive.component.scss']
})
export class CustomDirectiveComponent implements OnInit {
  cardType: any;
  paymentForm: FormGroup;
  employee: any = {};
  empForm: any;
  formDataObj: { name: any; passwordGroup: any; };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      aNumberField: ['']
    });
  }

  onKey(event: any) {
    this.cardType = event.target.value;
  }

  onSubmit(emp) {
    this.empForm = emp;
    console.log(this.empForm);
    this.formDataObj = {
      name: emp.name,
      passwordGroup: emp.passwordGroup
    }
  }

}
