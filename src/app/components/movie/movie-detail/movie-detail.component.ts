import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie, Config, MovieService } from '../movie.service';

// const Vibrant = require('node-vibrant'); // using this format because node-vibrant uses 'export =' format

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie
  ratings: object[];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const { movie } = data;
      this.movie = movie;
      this.ratings = Array(3).fill(new Object());
      this.ratings[0] = {
        link: `https://www.themoviedb.org/movie/${movie.id}`,
        rating: movie.vote_average
      };

      this.getDoubanRating(movie.imdb_id);
      this.getOMDBRatings(movie.imdb_id);
      this.movieService.getTMDBConfig(this.getPaletteFromPoster.bind(this));
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

  getPaletteFromPoster(config: Config) {
    let image = config.images.secure_base_url + config.images.poster_sizes[2] + this.movie.poster_path;

  }

  getReleaseYear() {
    return this.movie.release_date.substring(0, 4);
  }

}
