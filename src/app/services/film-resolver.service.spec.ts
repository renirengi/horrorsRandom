import { TestBed } from '@angular/core/testing';

import { FilmResolverService } from './film-resolver.service';

describe('FilmResolverService', () => {
  let service: FilmResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
