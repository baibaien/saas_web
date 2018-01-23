import { TestBed, inject } from '@angular/core/testing';

import { HrChangeService } from './hr-change.service';

describe('HrChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrChangeService]
    });
  });

  it('should ...', inject([HrChangeService], (service: HrChangeService) => {
    expect(service).toBeTruthy();
  }));
});
