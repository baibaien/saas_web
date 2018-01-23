import { TestBed, inject } from '@angular/core/testing';

import { GlobalMaskControlService } from './global-mask-control.service';

describe('GlobalMaskControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalMaskControlService]
    });
  });

  it('should ...', inject([GlobalMaskControlService], (service: GlobalMaskControlService) => {
    expect(service).toBeTruthy();
  }));
});
