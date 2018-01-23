import { TestBed, inject } from '@angular/core/testing';

import { AssistCenterApiService } from './assist-center-api.service';

describe('AssistCenterApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistCenterApiService]
    });
  });

  it('should ...', inject([AssistCenterApiService], (service: AssistCenterApiService) => {
    expect(service).toBeTruthy();
  }));
});
