import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movies: object;
  loading: boolean;
  searchFocused: boolean;
  title: string;
  
  constructor(private movieService: MovieService) { }
  
  ngOnInit() { 
    this.loading = true;
    this.title = 'COMING SOON';
    this.movieService.fetchMovies().subscribe(
      data => {
        this.loading = false;        
        this.movies = data['subjects'];
      },

      err => {
        this.loading = false;        
        console.log(err);
      }
    );
  }

  onSearchFocus(focused: boolean) {
    this.searchFocused = focused;
  }

  onSearchSubmit(keyword: string) {
    this.loading = true;
    this.movies = [];
    this.title = 'SEARCH RESULT';
    this.movieService.fetchWithKeyword(keyword).subscribe(
      data => {
        this.loading = false;        
        this.movies = data['subjects'];
      },

      err => {
        this.loading = false;        
        console.log(err);
      }
    )
  }

}