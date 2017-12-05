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
  movies: Movie[] = [];
  cache: object = {};
  state: string = 'inactive';
  page: number = 1;
  totalPage: number = 1;
  
  constructor(private movieService: MovieService) {
    this.fetchMovies = this.fetchMovies.bind(this);
    this.processData = this.processData.bind(this);
  }

  ngOnInit() {
    this.movieService.fetchMovies(this.page).subscribe(this.processData);
  }

  fetchMovies() {
    if (this.page > this.totalPage) {
      return; // no more results
    }
    
    return this.movieService.fetchMovies(this.page).do(this.processData);
  }

  processData(data) {
    const results = data['results'];
    this.removeDuplicates(results); // results between pages may contain duplicates from API
    this.movies = this.movies.concat(results.filter((movie) => movie !== null));
    this.page++;
    this.totalPage = data['total_pages'];
    this.state = 'active';
  }

  removeDuplicates(results) {
    const hash = {};

    for (let i = 0; i < results.length; i++) {
      const id = results[i].id;
      hash[id] = true;
      if (this.cache[id]) {
        results[i] = null; 
      }
    }

    this.cache = hash;
  }

}

