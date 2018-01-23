import { TestBed, inject } from '@angular/core/testing';

import { AssistModalService } from './assist-modal.service';

describe('AssistModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistModalService]
    });
  });

  it('should ...', inject([AssistModalService], (service: AssistModalService) => {
    expect(service).toBeTruthy();
  }));
});
