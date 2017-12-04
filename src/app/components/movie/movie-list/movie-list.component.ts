import { Component, OnInit, Input } from '@angular/core';
import {
  animate,
  trigger,
  state,
  style,
  transition
} from '@angular/animations';

import { Movie, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  animations: [
    trigger('state', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 100
      })),
      transition('inactive => active', animate('250ms ease-in'))
    ])
  ]
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  state: string;
  page: number;
  
  constructor(private movieService: MovieService) {
    this.movies = [];
    this.page = 1;
    this.state = 'inactive';
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.fetchMovies(this.page).subscribe((data) => {
      this.page++;
      this.movies = this.movies.concat(data['results']);
      this.state = 'active';
    }, (err) => {
      console.log(err);
    });
  }

}

