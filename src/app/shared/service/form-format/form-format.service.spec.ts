import { TestBed, inject } from '@angular/core/testing';

import { FormFormatService } from './form-format.service';

describe('FormFormatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormFormatService]
    });
  });

  it('should ...', inject([FormFormatService], (service: FormFormatService) => {
    expect(service).toBeTruthy();
  }));
});
