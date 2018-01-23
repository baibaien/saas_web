import { TestBed, inject } from '@angular/core/testing';

import { StaffFamiliesService } from './staff-families.service';

describe('StaffFamiliesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffFamiliesService]
    });
  });

  it('should ...', inject([StaffFamiliesService], (service: StaffFamiliesService) => {
    expect(service).toBeTruthy();
  }));
});
