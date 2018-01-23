import { TestBed, inject } from '@angular/core/testing';

import { SalaryHistoryApiService } from './salary-history-api.service';

describe('SalaryHistoryApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryHistoryApiService]
    });
  });

  it('should ...', inject([SalaryHistoryApiService], (service: SalaryHistoryApiService) => {
    expect(service).toBeTruthy();
  }));
});
