import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincompholderComponent } from './maincompholder.component';

describe('MaincompholderComponent', () => {
  let component: MaincompholderComponent;
  let fixture: ComponentFixture<MaincompholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincompholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincompholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
