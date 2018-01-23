import { TestBed, inject } from '@angular/core/testing';

import { ThirdPlatformServiceService } from './third-platform-service.service';

describe('ThirdPlatformServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdPlatformServiceService]
    });
  });

  it('should be created', inject([ThirdPlatformServiceService], (service: ThirdPlatformServiceService) => {
    expect(service).toBeTruthy();
  }));
});
