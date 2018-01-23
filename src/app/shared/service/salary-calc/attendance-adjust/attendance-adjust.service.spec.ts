import { TestBed, inject } from '@angular/core/testing';

import { AttendanceAdjustService } from './attendance-adjust.service';

describe('AttendanceAdjustService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceAdjustService]
    });
  });

  it('should ...', inject([AttendanceAdjustService], (service: AttendanceAdjustService) => {
    expect(service).toBeTruthy();
  }));
});
