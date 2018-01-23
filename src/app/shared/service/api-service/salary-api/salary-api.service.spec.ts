import { TestBed, inject } from '@angular/core/testing';

import { SalaryApiService } from './salary-api.service';

describe('SalaryApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryApiService]
    });
  });

  it('should ...', inject([SalaryApiService], (service: SalaryApiService) => {
    expect(service).toBeTruthy();
  }));
});
