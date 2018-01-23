import { TestBed, inject } from '@angular/core/testing';

import { RootApiService } from './root-api.service';

describe('RootApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootApiService]
    });
  });

  it('should ...', inject([RootApiService], (service: RootApiService) => {
    expect(service).toBeTruthy();
  }));
});
