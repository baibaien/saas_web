import { TestBed, inject } from '@angular/core/testing';

import { SalaryOutsourcingApiService } from './salary-outsourcing-api.service';

describe('SalaryOutsourcingApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryOutsourcingApiService]
    });
  });

  it('should ...', inject([SalaryOutsourcingApiService], (service: SalaryOutsourcingApiService) => {
    expect(service).toBeTruthy();
  }));
});
