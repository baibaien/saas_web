import { TestBed, inject } from '@angular/core/testing';

import { StaffOutlineService } from './staff-outline.service';

describe('StaffOutlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffOutlineService]
    });
  });

  it('should ...', inject([StaffOutlineService], (service: StaffOutlineService) => {
    expect(service).toBeTruthy();
  }));
});
