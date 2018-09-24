import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersidepaginationComponent } from './serversidepagination.component';

describe('ServersidepaginationComponent', () => {
  let component: ServersidepaginationComponent;
  let fixture: ComponentFixture<ServersidepaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersidepaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersidepaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
