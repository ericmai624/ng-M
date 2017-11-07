import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() movie: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.fetchPoster(this.movie.images.large).subscribe(
      data => {
        this.movie.imageURL = data;
      },

      err => {
        console.log(err);
      }
    );
  }

}

interface Movie {
  title: string,
  rating: {
    max: number,
    average: number,
    stars: string,
    min: number
  },
  images: {
    small: string,
    large: string,
    medium: string
  },
  genres: string[],
  original_title: string,
  year: string,
  id: string,
  directors: [{}],
  casts: [{}],
  imageURL: any
}
