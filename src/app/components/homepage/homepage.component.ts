import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

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
  showSearchResults: boolean;
  title: string;
  
  constructor(private movieService: MovieService) {
    this.title = 'NOW PLAYING';
    this.searchFocused = false;
    this.showSearchResults = false;
    this.fetching = true;
  }
  
  ngOnInit() { }

  onFetchingMovies(fetching: boolean) {
    this.fetching = fetching;
  }

  onSearchFocus(focused: boolean) {
    this.searchFocused = focused;
  }

  onSearchSubmit(keyword: string) {
    this.fetching = true;
    this.showSearchResults = true;
    this.movieService.fetchWithKeyword(keyword).subscribe((data: Movie[]) => {
      this.fetching = false;
      this.searchResults = data['results'];
      this.title = 'SEARCH RESULTS';
    }, (err: string) => console.log(err));
  }

}