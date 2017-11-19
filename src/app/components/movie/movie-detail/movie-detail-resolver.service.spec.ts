import { TestBed, inject } from '@angular/core/testing';

import { MovieDetailResolver } from './movie-detail-resolver.service';

describe('MovieDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailResolver]
    });
  });

  it('should be created', inject([MovieDetailResolver], (service: MovieDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});
