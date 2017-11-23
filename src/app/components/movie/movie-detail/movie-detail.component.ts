import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie, Config, MovieService } from '../movie.service';
import { CanvasCircleRatingDirective } from '../canvas-circle-rating.directive';

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
  backdrop: object;
  poster: string;
  urlTitle: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.background = {
      'background-image': 'radial-gradient('
                          + 'circle at 20% 50%,'
                          + 'rgba(94.12%, 69.41%, 3.92%, 0.94) 0%,'
                          + 'rgba(83.14%, 43.92%, 0.00%, 0.94) 100%)' 
    };
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movie = data.movie;
      this.fetchBackdropAndPoster(this.movie);
      this.urlTitle = this.movieService.updateUrl(this.movie.title);
      this.getDoubanRating(this.movie.imdb_id);
      this.getOMDBRatings(this.movie.imdb_id);
    });
  }

  fetchBackdropAndPoster(movie) {
    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_baseurl'));
    if (!config) {
      this.movieService.getTMDBConfig().subscribe((data: Config) => {
        window.localStorage.setItem('tmdb_baseurl', JSON.stringify(data));
        config = data;
      });
    }
    this.poster = config.images.secure_base_url + config.images.poster_sizes[4] + movie.poster_path;
    this.backdrop = {
      'background-image': 'url(' + config.images.secure_base_url + config.images.backdrop_sizes[2] + movie.backdrop_path + ')';
    }
  }

  getReleaseYear() {
    return this.movie.release_date.substring(0, 4);
  }

  getDoubanRating(id: string) {
    this.movieService.fetchDouBanRating(id).subscribe((data: object) => {
      this.doubanRating = data['average'];
    }, (err: string) => {
      console.log(err);
    });
  }

  getOMDBRatings(id: string) {
    this.movieService.fetchOMDBDetail(id).subscribe((data: object) => {
      this.imdbRating = data['imdbRating'];
      this.rottenTomatoesRating = data['rottenTomatoesRating'];
    }, (err: string) => {
      console.log(err);
    });
  }

}
