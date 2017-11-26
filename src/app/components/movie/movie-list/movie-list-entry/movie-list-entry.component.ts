import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../movie.service';

@Component({
  selector: 'app-movie-list-entry',
  templateUrl: './movie-list-entry.component.html',
  styleUrls: ['./movie-list-entry.component.css']
})
export class MovieListEntryComponent implements OnInit {
  @Input() movie: Movie;  
  posterStyle: object;

  constructor() { 
    this.posterStyle = {
      width: '150px',
      height: '225px'
    };
  }

  ngOnInit() { }

}
