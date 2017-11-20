import { Component, OnInit, Input } from '@angular/core';

import { Movie, MovieService } from '../../movie.service';

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
    this.getPoster(this.movie.poster_path);
    this.urlTitle = this.movieService.updateUrl(this.movie.title);    
  }

  getPoster(link: string) {
    this.movieService.fetchImage(link, 'poster').subscribe((data: string) => {
      this.poster = data;
    }, (err: string) => {
      this.poster = '/assets/icons/icons8-popcorn-time.png';
      console.log(err);
    });
  }

}
