import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie, Config, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  doubanRating: number;
  imdbRating: number;
  rottenTomatoesRating: number;
  background: object;
  posterStyle: object;
  posterImgStyle: object;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.background = {
      'background-image': 'radial-gradient('
                          + 'circle at 20% 50%,'
                          + 'rgba(94.12%, 69.41%, 3.92%, 0.94) 0%,'
                          + 'rgba(83.14%, 43.92%, 0.00%, 0.94) 100%)' 
    };

    this.posterStyle = {
      width: '300px',
      height: '100%',
      background: 'transparent'
    }
    this.posterImgStyle = {
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px'
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movie = data.movie;
      this.getDoubanRating(this.movie.imdb_id);
      this.getOMDBRatings(this.movie.imdb_id);
    });
  }

  getReleaseYear() {
    return this.movie.release_date.substring(0, 4);
  }

  getDoubanRating(id: string) {
    this.movieService.fetchDouBanRating(id).subscribe((data: object) => {
      if (data) {
        this.doubanRating = data['average'];
      }
    });
  }

  getOMDBRatings(id: string) {
    this.movieService.fetchOMDBDetail(id).subscribe((data: object) => {
      if (data) {
        this.imdbRating = data['imdbRating'];
        this.rottenTomatoesRating = data['rottenTomatoesRating'];
      }
    });
  }

}
