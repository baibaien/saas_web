import { TestBed, inject } from '@angular/core/testing';

import { AccountSettingsService } from './account-settings.service';

describe('AccountSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSettingsService]
    });
  });

  it('should ...', inject([AccountSettingsService], (service: AccountSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
