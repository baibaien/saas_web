import { TestBed, inject } from '@angular/core/testing';

import { StaffListService } from './staff-list.service';

describe('StaffListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffListService]
    });
  });

  it('should ...', inject([StaffListService], (service: StaffListService) => {
    expect(service).toBeTruthy();
  }));
});
