import { TestBed, inject } from '@angular/core/testing';

import { PayScheduleApiService } from './pay-schedule-api.service';

describe('PayScheduleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayScheduleApiService]
    });
  });

  it('should ...', inject([PayScheduleApiService], (service: PayScheduleApiService) => {
    expect(service).toBeTruthy();
  }));
});
