import { TestBed, inject } from '@angular/core/testing';

import { ServerSideDataService } from './server-side-data.service';

describe('ServerSideDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerSideDataService]
    });
  });

  it('should be created', inject([ServerSideDataService], (service: ServerSideDataService) => {
    expect(service).toBeTruthy();
  }));
});
