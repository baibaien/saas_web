import { TestBed, inject } from '@angular/core/testing';

import { StaffGeneralChangeService } from './staff-general-change.service';

describe('StaffGeneralChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffGeneralChangeService]
    });
  });

  it('should ...', inject([StaffGeneralChangeService], (service: StaffGeneralChangeService) => {
    expect(service).toBeTruthy();
  }));
});
