import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() movie: Movie;
  poster: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() { 
    this.getPoster();
  }

  getPoster() {
    this.movieService.fetchPoster(this.movie.poster_path).subscribe(
      (data: string) => {
        this.poster = data;
      },

      (err: string) => {
        console.log(err);
      }
    );
  }

}

interface Movie {
  vote_count: number,
  id: number,
  video: boolean,
  title: string,
  popularity: number,
  poster_path: string,
  original_language: string,
  original_title: string,
  genre_ids: number[],
  backdrop_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
}
