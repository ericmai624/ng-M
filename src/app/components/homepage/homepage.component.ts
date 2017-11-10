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
  imgSrcPrefix: string;
  loading: boolean;
  searchFocused: boolean;
  title: string;
  
  constructor(private movieService: MovieService) { }
  
  ngOnInit() { 
    this.loading = true;
    this.title = 'POPULAR';
    this.movieService.fetchMovies().subscribe(
      (data: object) => {
        this.loading = false;        
        this.movies = data['results'];
        this.imgSrcPrefix = data['images'];
      },

      (err: string) => {
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
        this.movies = data['results'].sort((a, b) => {
          let curr = Date.parse(a['release_date']);
          let next = Date.parse(b['release_date']);
          return next - curr;
        });
      },

      err => {
        this.loading = false;        
        console.log(err);
      }
    )
  }

}