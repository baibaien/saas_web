import { TestBed, inject } from '@angular/core/testing';

import { SaasIndexService } from './saas-index.service';

describe('SaasIndexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaasIndexService]
    });
  });

  it('should be created', inject([SaasIndexService], (service: SaasIndexService) => {
    expect(service).toBeTruthy();
  }));
});
