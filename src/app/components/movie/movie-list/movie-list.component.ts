import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() movie: Movie;
  @Input() imgSrcPrefix: Images;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
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

interface Images {
  base_url: string,
  secure_base_url: string,
  backdrop_sizes: string[],
  logo_sizes: string[],
  poster_sizes: string[],
  profile_sizes: string[],
  still_sizes: string[]
}
