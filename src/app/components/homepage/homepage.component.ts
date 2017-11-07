import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movies: [{}];
  searchFocused: boolean;
  
  constructor(private movieService: MovieService) { }
  
  ngOnInit() { 
    this.movieService.fetchMovies().subscribe(
      data => {
        this.movies = data['subjects'];
      },

      err => {
        console.log(err);
      }
    );
  }

  onSearchFocus(focused: boolean) {
    this.searchFocused = focused;
  }

  onSearchSubmit(keyword: string) {
    this.movieService.fetchWithKeyword(keyword).subscribe(
      data => {
        this.movies = data['subjects'];
      },

      err => {
        console.log(err);
      }
    )
  }

}