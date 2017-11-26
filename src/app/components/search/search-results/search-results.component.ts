import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router'

import { Movie, MovieService } from '../../movie/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  results: Movie[];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.movieService.fetchWithKeyword(params.get('query'));
    }).subscribe((data) => {
      this.results = data['results'];
    }, (err) => console.log(err));
  }

}
