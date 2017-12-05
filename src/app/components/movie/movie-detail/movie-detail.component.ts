import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie, Config, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  ratings: object[];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const { movie } = data;
      this.movie = movie;
      this.ratings = Array(3).fill(new Object());
      this.getRating();
    });
  }

  getRating() {
    if (!this.movie.imdb_id || this.movie.imdb_id === '') {
      return;
    }
    
    this.movieService.getRating(this.movie.imdb_id).subscribe((data) => {
      this.ratings = [
        {
          link: `https://www.themoviedb.org/movie/${this.movie.id}`,
          rating: this.movie.vote_average 
        },
        {
          link: `http://www.imdb.com/title/${data['imdb']['id']}`,
          rating: data['imdb']['rating']
        },
        {
          link: `https://movie.douban.com/subject/${data['douban']['id']}`,
          rating: data['douban']['rating']
        }
      ]
    });
  }

  getReleaseYear() {
    return this.movie.release_date.substring(0, 4);
  }

}
