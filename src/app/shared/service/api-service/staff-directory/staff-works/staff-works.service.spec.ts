import { TestBed, inject } from '@angular/core/testing';

import { StaffWorksService } from './staff-works.service';

describe('StaffWorksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffWorksService]
    });
  });

  it('should ...', inject([StaffWorksService], (service: StaffWorksService) => {
    expect(service).toBeTruthy();
  }));
});
