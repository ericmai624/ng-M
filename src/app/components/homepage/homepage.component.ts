import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { Router } from '@angular/router';

import { Movie, MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  fetching: boolean;
  searchFocused: boolean;
  searchResults: Movie[];
  title: string;
  
  constructor(private movieService: MovieService, private router: Router) {
    this.searchFocused = false;
    this.fetching = false;
  }
  
  ngOnInit() { }

  onFetchingMovies(fetching: boolean) {
    this.fetching = fetching;
  }

  onSearchFocus(focused: boolean) {
    this.searchFocused = focused;
  }

  onSearchSubmit(query: string) {
    this.router.navigate(['search', 'movie', query]);
  }

}