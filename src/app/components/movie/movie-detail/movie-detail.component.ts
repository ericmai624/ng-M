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
  doubanRating: object;
  background: object;
  backdrop: object;
  poster: string;
  urlTitle: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { 
    this.background = {
      'background-image': 'radial-gradient(circle at 20% 50%, rgba(94.12%, 69.41%, 3.92%, 0.94) 0%, rgba(83.14%, 43.92%, 0.00%, 0.94) 100%)',    
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movie = data.movie;
      this.fetchBackdropAndPoster(this.movie);
      this.urlTitle = this.movieService.updateUrl(this.movie.title);
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
      this.doubanRating = data;
    }, (err: string) => {
      console.log(err);
    });
  }

}
