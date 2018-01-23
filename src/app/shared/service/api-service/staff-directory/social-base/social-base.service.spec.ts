import { TestBed, inject } from '@angular/core/testing';

import { SocialBaseService } from './social-base.service';

describe('SocialBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialBaseService]
    });
  });

  it('should ...', inject([SocialBaseService], (service: SocialBaseService) => {
    expect(service).toBeTruthy();
  }));
});
