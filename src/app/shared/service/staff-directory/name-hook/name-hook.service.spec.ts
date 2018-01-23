import { TestBed, inject } from '@angular/core/testing';

import { NameHookService } from './name-hook.service';

describe('NameHookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NameHookService]
    });
  });

  it('should ...', inject([NameHookService], (service: NameHookService) => {
    expect(service).toBeTruthy();
  }));
});
