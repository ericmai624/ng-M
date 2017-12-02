import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Movie, MovieService } from '../movie.service';

@Injectable()
export class MovieDetailResolver implements Resolve<Movie> {

  constructor(private movieService: MovieService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
    const id = route.paramMap.get('id');

    return this.movieService.fetchMovieDetailById(id).take(1).map((movie: Movie) => {
      if (movie) {
        return movie;
      }
      // navigate to an error route if can't fetch details
      return null;
    });
  }
}
