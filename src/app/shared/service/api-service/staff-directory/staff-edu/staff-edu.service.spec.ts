import { TestBed, inject } from '@angular/core/testing';

import { StaffEduService } from './staff-edu.service';

describe('StaffEduService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffEduService]
    });
  });

  it('should ...', inject([StaffEduService], (service: StaffEduService) => {
    expect(service).toBeTruthy();
  }));
});
