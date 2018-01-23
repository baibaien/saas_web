import { TestBed, inject } from '@angular/core/testing';

import { StaffUploadService } from './staff-upload.service';

describe('StaffUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffUploadService]
    });
  });

  it('should ...', inject([StaffUploadService], (service: StaffUploadService) => {
    expect(service).toBeTruthy();
  }));
});
