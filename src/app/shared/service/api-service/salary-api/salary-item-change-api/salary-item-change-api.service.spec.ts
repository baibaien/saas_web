import { TestBed, inject } from '@angular/core/testing';

import { SalaryItemChangeApiService } from './salary-item-change-api.service';

describe('SalaryItemChangeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryItemChangeApiService]
    });
  });

  it('should ...', inject([SalaryItemChangeApiService], (service: SalaryItemChangeApiService) => {
    expect(service).toBeTruthy();
  }));
});
