import { TestBed, inject } from '@angular/core/testing';

import { SocialAssuranceService } from './social-assurance.service';

describe('SocialAssuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialAssuranceService]
    });
  });

  it('should ...', inject([SocialAssuranceService], (service: SocialAssuranceService) => {
    expect(service).toBeTruthy();
  }));
});
