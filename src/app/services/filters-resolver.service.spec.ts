import { TestBed } from '@angular/core/testing';

import { FiltersResolverService } from './filters-resolver.service';

describe('FiltersResolverService', () => {
  let service: FiltersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
