import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: object;
  poster: string;
  @Output() fetchingMovie: EventEmitter<boolean>;
  
  constructor(private movieService: MovieService) { 
    this.movies = [];
    this.fetchingMovie = new EventEmitter();
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.fetchingMovie.emit(true);
    this.movieService.fetchMovies().subscribe(
      data => {
        this.fetchingMovie.emit(false);
        this.movies = data['results'];
      },

      err => {
        console.log(err);
      }
    )
  }

}

