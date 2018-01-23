import { TestBed, inject } from '@angular/core/testing';

import { StaffDetailService } from './staff-detail.service';

describe('StaffDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffDetailService]
    });
  });

  it('should ...', inject([StaffDetailService], (service: StaffDetailService) => {
    expect(service).toBeTruthy();
  }));
});
