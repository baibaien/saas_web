import { TestBed, inject } from '@angular/core/testing';

import { HrAreasService } from './hr-areas.service';

describe('HrAreasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAreasService]
    });
  });

  it('should ...', inject([HrAreasService], (service: HrAreasService) => {
    expect(service).toBeTruthy();
  }));
});
