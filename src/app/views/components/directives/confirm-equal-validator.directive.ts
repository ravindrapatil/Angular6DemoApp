import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  
  constructor() { }

  @Input() appConfirmEqualValidator: string;
  validate(control: AbstractControl): {[key:string]: any} | null {
    // if validation success it will return null and if fails then it will return object {}
    const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
    // Here 'control' is the confirm password field and 'controlToCompare' is the password field
    // This is for if it fails
    if(controlToCompare && controlToCompare.value !== control.value) {
      return {'notEqual' : true}
    }
    // This line of code is for success
    return null;
  }

}


// https://www.youtube.com/watch?v=YhazkQd59Hk
// https://www.youtube.com/watch?v=lOAb-D_gYHE