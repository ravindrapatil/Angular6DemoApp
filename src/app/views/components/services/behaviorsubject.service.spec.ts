import { TestBed, inject } from '@angular/core/testing';

import { BehaviorsubjectService } from './behaviorsubject.service';

describe('BehaviorsubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BehaviorsubjectService]
    });
  });

  it('should be created', inject([BehaviorsubjectService], (service: BehaviorsubjectService) => {
    expect(service).toBeTruthy();
  }));
});
