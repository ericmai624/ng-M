import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() movie: Movie;

  constructor() { }

  ngOnInit() { }

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
  imageURL: string
}
