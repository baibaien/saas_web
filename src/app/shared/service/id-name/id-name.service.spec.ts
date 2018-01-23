import { TestBed, inject } from '@angular/core/testing';

import { IdNameService } from './id-name.service';

describe('IdNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdNameService]
    });
  });

  it('should ...', inject([IdNameService], (service: IdNameService) => {
    expect(service).toBeTruthy();
  }));
});
