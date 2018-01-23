import { TestBed, inject } from '@angular/core/testing';

import { SpecialServiceApiService } from './special-service-api.service';

describe('SpecialServiceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialServiceApiService]
    });
  });

  it('should ...', inject([SpecialServiceApiService], (service: SpecialServiceApiService) => {
    expect(service).toBeTruthy();
  }));
});
