import { TestBed, inject } from '@angular/core/testing';

import { SbService } from './sb.service';

describe('SbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SbService]
    });
  });

  it('should be created', inject([SbService], (service: SbService) => {
    expect(service).toBeTruthy();
  }));
});
