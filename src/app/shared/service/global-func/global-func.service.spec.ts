import { TestBed, inject } from '@angular/core/testing';

import { GlobalFuncService } from './global-func.service';

describe('GlobalFuncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalFuncService]
    });
  });

  it('should ...', inject([GlobalFuncService], (service: GlobalFuncService) => {
    expect(service).toBeTruthy();
  }));
});
