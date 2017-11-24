import { Component, OnInit, Input } from '@angular/core';

import { Movie, MovieService } from '../../movie/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() results: Movie[];

  constructor() { }

  ngOnInit() { }

}
