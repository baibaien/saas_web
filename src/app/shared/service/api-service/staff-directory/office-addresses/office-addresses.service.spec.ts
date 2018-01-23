import { TestBed, inject } from '@angular/core/testing';

import { OfficeAddressesService } from './office-addresses.service';

describe('OfficeAddressesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeAddressesService]
    });
  });

  it('should ...', inject([OfficeAddressesService], (service: OfficeAddressesService) => {
    expect(service).toBeTruthy();
  }));
});
