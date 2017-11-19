import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Movie, MovieService } from '../movie.service';

@Injectable()
export class MovieDetailResolver implements Resolve<Movie> {

  constructor(private movieService: MovieService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
    const id = route.paramMap.get('id');

    return this.movieService.fetchMovieDetailById(id).map((movie: Movie) => {
      if (movie) {
        return movie;
      }
      return null;
    });
  }
}
