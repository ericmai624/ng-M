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
  movie: Movie
  background: object = {};
  posterStyle: object = {};
  posterImgStyle: object = {};
  ratings: object[];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.background['background-image'] = 'radial-gradient(circle at 20% 50%,rgba(94.12%, 69.41%, 3.92%, 0.94) 0%,rgba(83.14%, 43.92%, 0.00%, 0.94) 100%)';

    this.posterStyle['width'] = '300px';
    this.posterStyle['height'] = '100%';
    this.posterStyle['background'] = 'transparent';

    this.posterImgStyle['borderRadius'] = '4px';
    this.posterImgStyle['boxShadow'] = '0 0 4px rgba(0, 0, 0, 0.2)';
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const { movie } = data;
      this.movie = movie;
      this.ratings = Array(3).fill(new Object());
      this.getDoubanRating(movie.imdb_id);
      this.getOMDBRatings(movie.imdb_id);
      this.ratings[0] = {
        link: `https://www.themoviedb.org/movie/${movie.id}`,
        rating: movie.vote_average
      };
      console.log(movie);
    });
  }

  getOMDBRatings(id: string) {
    this.movieService.fetchOMDBDetail(id).subscribe((data: string) => {
      if (data) {
        this.ratings[1] = {
          link: `http://www.imdb.com/title/${this.movie.imdb_id}`,
          rating: data
        };
      }
    });
  }

  getDoubanRating(id: string) {
    this.movieService.fetchDouBanRating(id).subscribe((data: object) => {
      if (data) {
        this.ratings[2] = {
          link: `https://movie.douban.com/subject/${data['id']}`,
          rating: data['rating']['average']
        };
      }
    });
  }

  getReleaseYear() {
    return this.movie.release_date.substring(0, 4);
  }

}
