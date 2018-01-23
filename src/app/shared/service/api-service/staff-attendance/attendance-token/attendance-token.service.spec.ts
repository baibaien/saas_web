import { TestBed, inject } from '@angular/core/testing';

import { AttendanceTokenService } from './attendance-token.service';

describe('AttendanceTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceTokenService]
    });
  });

  it('should ...', inject([AttendanceTokenService], (service: AttendanceTokenService) => {
    expect(service).toBeTruthy();
  }));
});
