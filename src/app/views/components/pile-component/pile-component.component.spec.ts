import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PileComponentComponent } from './pile-component.component';

describe('PileComponentComponent', () => {
  let component: PileComponentComponent;
  let fixture: ComponentFixture<PileComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PileComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
