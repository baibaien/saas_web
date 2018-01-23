import { TestBed, inject } from '@angular/core/testing';

import { SocialAssuranceApiService } from './social-assurance-api.service';

describe('SocialAssuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialAssuranceApiService]
    });
  });

  it('should ...', inject([SocialAssuranceApiService], (service: SocialAssuranceApiService) => {
    expect(service).toBeTruthy();
  }));
});
