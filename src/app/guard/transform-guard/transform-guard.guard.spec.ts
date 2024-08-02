import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { transformGuardGuard } from './transform-guard.guard';

describe('transformGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => transformGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
