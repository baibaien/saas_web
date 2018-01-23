import { TestBed, inject } from '@angular/core/testing';

import { FilterTermService } from './filter-term.service';

describe('FilterTermService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterTermService]
    });
  });

  it('should ...', inject([FilterTermService], (service: FilterTermService) => {
    expect(service).toBeTruthy();
  }));
});
