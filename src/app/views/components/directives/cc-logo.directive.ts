import { Directive, Input, OnChanges, HostBinding, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCcLogo]'
})
export class CcLogoDirective implements OnInit {

  @HostBinding('class.card-outline-primary') private ishovering: boolean;
  @Input() customHoverTextColor: any;
  @Input() colorWhite: any;

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.color = '#fff';
    this.el.nativeElement.style.background = '#ff5722';
    this.el.nativeElement.style.padding = '10px';
    this.el.nativeElement.style.borderRadius = "5px";
    this.el.nativeElement.style.border = "1px solid #fff";
    this.el.nativeElement.style.boxShadow = "2px 2px 0px 1px #e0c3c3";
  }

  ngOnInit() {
    console.log('Custom directive loaded successfully');
  }

  @HostListener("mouseover") onmouseover() {
    this.highlight(this.customHoverTextColor);
    this.ishovering = true;
  }

  @HostListener("mouseout") onmouseout() {
    // this.el.nativeElement.style.color = this.colorWhite;
    this.highlight(this.colorWhite);
    this.ishovering = false;
  }

  public highlight(color) {
    this.el.nativeElement.style.color = color;
  }

}

// By using the @HostListener and @HostBinding decorators we can both 
// listen to output events from our host element and also bind to input 
// properties on our host element as well.

enum CardType { VISA = 'visa', MASTERCARD = 'mastercard', 
                  AMERICAN_EXPRESS = 'american-express', UNKNOWN = 'unknown'}

@Directive({
  selector: '[appCcLogo2]'
})
export class CcLogoDirective2 implements OnChanges {
  
  @HostBinding('src') imageSource;
  @Input() cardNumber: string;

  constructor() {}

  ngOnChanges() {
    this.imageSource = 'assets/img/' + this.getCardTypeFromNumber() + '.png';  
  }

  public getCardTypeFromNumber() {
    if(this.cardNumber == null) {
      return true;
    }
    let cardNumtoStr = this.cardNumber.toString();
    if (cardNumtoStr) {
      if (cardNumtoStr.startsWith('3')) {
        return CardType.AMERICAN_EXPRESS;
      } else if (cardNumtoStr.startsWith('4')) {
        return CardType.VISA;
      } else if (cardNumtoStr.startsWith('5')) {
        return CardType.MASTERCARD;
      }
    }
    return CardType.UNKNOWN;
  }

}

// Number Only Directive
@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {
  private el: NgControl;

  constructor(private ngControl: NgControl) {
    this.el = ngControl;
  }

  // Listen for the input event to also handle copy and paste.
  @HostListener('input', ['$event.target.value'])
    onInput(value) {
      this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
    }
}

// https://www.youtube.com/watch?v=YhazkQd59Hk
// https://www.youtube.com/watch?v=lOAb-D_gYHE