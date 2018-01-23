import { TestBed, inject } from '@angular/core/testing';

import { WithdrawApiService } from './withdraw-api.service';

describe('WithdrawApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WithdrawApiService]
    });
  });

  it('should be created', inject([WithdrawApiService], (service: WithdrawApiService) => {
    expect(service).toBeTruthy();
  }));
});
