import { TestBed } from '@angular/core/testing';

import { NombreDelGuardGuard } from './nombre-del-guard.guard';

describe('NombreDelGuardGuard', () => {
  let guard: NombreDelGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NombreDelGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
