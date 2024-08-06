import { TestBed } from '@angular/core/testing';

import { ShareInputService } from './share-input.service';

describe('ShareInputService', () => {
  let service: ShareInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
