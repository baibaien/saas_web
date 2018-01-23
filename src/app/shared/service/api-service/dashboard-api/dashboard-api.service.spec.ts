import { TestBed, inject } from '@angular/core/testing';

import { DashboardApiService } from './dashboard-api.service';

describe('DashboardApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardApiService]
    });
  });

  it('should ...', inject([DashboardApiService], (service: DashboardApiService) => {
    expect(service).toBeTruthy();
  }));
});
