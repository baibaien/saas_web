import { TestBed, inject } from '@angular/core/testing';

import { SalaryItemChangeService } from './salary-item-change.service';

describe('SalaryItemChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryItemChangeService]
    });
  });

  it('should ...', inject([SalaryItemChangeService], (service: SalaryItemChangeService) => {
    expect(service).toBeTruthy();
  }));
});
