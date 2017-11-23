import { Component, OnInit, Input } from '@angular/core';

import { Movie, Config, MovieService } from '../../movie.service';

@Component({
  selector: 'app-movie-list-entry',
  templateUrl: './movie-list-entry.component.html',
  styleUrls: ['./movie-list-entry.component.css']
})
export class MovieListEntryComponent implements OnInit {
  @Input() movie: Movie;  
  poster: string;
  urlTitle: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    if (!this.movie.poster_path) {
      console.log('no poster path');
    }
    this.getPoster(this.movie.poster_path);
    this.urlTitle = this.movieService.updateUrl(this.movie.title);    
  }

  getPoster(link: string) {
    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_baseurl'));
    if (!config) {
      this.movieService.getTMDBConfig().subscribe((data: Config) => {
        window.localStorage.setItem('tmdb_baseurl', JSON.stringify(data));
        config = data;
      });
    }
    this.poster = config.images.secure_base_url + config.images.poster_sizes[4] + link;
  }

}
