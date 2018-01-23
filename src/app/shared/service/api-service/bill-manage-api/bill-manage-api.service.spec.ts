import { TestBed, inject } from '@angular/core/testing';

import { BillManageApiService } from './bill-manage-api.service';

describe('BillManageApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillManageApiService]
    });
  });

  it('should ...', inject([BillManageApiService], (service: BillManageApiService) => {
    expect(service).toBeTruthy();
  }));
});
