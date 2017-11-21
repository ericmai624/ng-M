import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  doubanRating: number;
  imdbRating: number;
  rottenTomatosRating: number;
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
    let backdrop = this.movieService.fetchImage(movie.backdrop_path, 'backdrop');
    let poster = this.movieService.fetchImage(movie.poster_path, 'poster');

    backdrop.subscribe((data: string) => {
      this.backdrop = { 'background-image': `url(${data})` };
    });

    poster.subscribe((data: string) => {
      this.poster = data;
    }, (err) => {
      this.poster = '';
    });
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
      this.imdbRating = Number(data['imdbRating']);
      if (data['Ratings'].length > 1) {
        let rottenTomatosRatingStr = data['Ratings'][1]['Value'];
        this.rottenTomatosRating = Number(rottenTomatosRatingStr.slice(0, -1)) / 10;
      }
    }, (err: string) => {
      console.log(err);
    });
  }

}