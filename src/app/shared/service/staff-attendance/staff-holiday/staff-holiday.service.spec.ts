import { TestBed, inject } from '@angular/core/testing';

import { StaffHolidayService } from './staff-holiday.service';

describe('StaffHolidayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffHolidayService]
    });
  });

  it('should ...', inject([StaffHolidayService], (service: StaffHolidayService) => {
    expect(service).toBeTruthy();
  }));
});
