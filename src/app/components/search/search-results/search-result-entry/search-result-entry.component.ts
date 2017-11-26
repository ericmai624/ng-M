import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../../movie/movie.service';

@Component({
  selector: 'app-search-result-entry',
  templateUrl: './search-result-entry.component.html',
  styleUrls: ['./search-result-entry.component.css']
})
export class SearchResultEntryComponent implements OnInit {
  @Input() movie: Movie;
  posterStyle: object;

  constructor() { 
    this.posterStyle = {
      width: (278 * 2 / 3) + 'px',
      height: '278px'
    };
  }

  ngOnInit() { }

}
