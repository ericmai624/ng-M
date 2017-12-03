import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() fetchingMovie: EventEmitter<boolean>;
  movies: Movie[];
  state: string;
  
  constructor(private movieService: MovieService) { 
    this.fetchingMovie = new EventEmitter();
    this.state = 'inactive';
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.fetchingMovie.emit(true);
    this.movieService.fetchMovies().subscribe((data) => {
      this.fetchingMovie.emit(false);
      this.movies = data['results'];
      this.state = 'active';
    }, (err) => {
      console.log(err);
    });
  }

}

