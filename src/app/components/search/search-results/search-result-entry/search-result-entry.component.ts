import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../../movie/movie.service';

@Component({
  selector: 'app-search-result-entry',
  templateUrl: './search-result-entry.component.html',
  styleUrls: ['./search-result-entry.component.css']
})
export class SearchResultEntryComponent implements OnInit {
  @Input() movie: Movie;

  constructor() { }

  ngOnInit() { }

}
