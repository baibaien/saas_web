import { TestBed, inject } from '@angular/core/testing';

import { InvoiceApiService } from './invoice-api.service';

describe('InvoiceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceApiService]
    });
  });

  it('should ...', inject([InvoiceApiService], (service: InvoiceApiService) => {
    expect(service).toBeTruthy();
  }));
});
