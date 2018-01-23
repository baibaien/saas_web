import { TestBed, inject } from '@angular/core/testing';

import { BillManageService } from './bill-manage.service';

describe('BillManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillManageService]
    });
  });

  it('should ...', inject([BillManageService], (service: BillManageService) => {
    expect(service).toBeTruthy();
  }));
});
