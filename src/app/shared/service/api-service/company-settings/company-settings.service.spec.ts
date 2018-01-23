import { TestBed, inject } from '@angular/core/testing';

import { CompanySettingsService } from './company-settings.service';

describe('CompanySettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanySettingsService]
    });
  });

  it('should ...', inject([CompanySettingsService], (service: CompanySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
