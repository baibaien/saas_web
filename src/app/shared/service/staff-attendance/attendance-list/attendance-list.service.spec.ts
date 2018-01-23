import { TestBed, inject } from '@angular/core/testing';

import { AttendanceListService } from './attendance-list.service';

describe('AttendanceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceListService]
    });
  });

  it('should ...', inject([AttendanceListService], (service: AttendanceListService) => {
    expect(service).toBeTruthy();
  }));
});
