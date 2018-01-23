import { TestBed, inject } from '@angular/core/testing';

import { SalaryCalcService } from './salary-calc.service';

describe('SalaryCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryCalcService]
    });
  });

  it('should ...', inject([SalaryCalcService], (service: SalaryCalcService) => {
    expect(service).toBeTruthy();
  }));
});
