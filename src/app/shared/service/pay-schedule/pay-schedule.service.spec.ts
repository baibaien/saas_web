import { TestBed, inject } from '@angular/core/testing';

import { PayScheduleService } from './pay-schedule.service';

describe('PayScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayScheduleService]
    });
  });

  it('should ...', inject([PayScheduleService], (service: PayScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
