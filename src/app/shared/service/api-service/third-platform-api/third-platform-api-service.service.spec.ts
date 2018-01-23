import { TestBed, inject } from '@angular/core/testing';

import { ThirdPlatformApiServiceService } from './third-platform-api-service.service';

describe('ThirdPlatformApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdPlatformApiServiceService]
    });
  });

  it('should be created', inject([ThirdPlatformApiServiceService], (service: ThirdPlatformApiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
