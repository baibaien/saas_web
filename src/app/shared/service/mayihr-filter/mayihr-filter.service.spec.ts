import { TestBed, inject } from '@angular/core/testing';

import { MayihrFilterService } from './mayihr-filter.service';

describe('MayihrFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MayihrFilterService]
    });
  });

  it('should ...', inject([MayihrFilterService], (service: MayihrFilterService) => {
    expect(service).toBeTruthy();
  }));
});
