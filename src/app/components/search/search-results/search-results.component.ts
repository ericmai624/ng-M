import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import {
  animate,
  trigger,
  state,
  style,
  transition
} from '@angular/animations';

import { Movie, MovieService } from '../../movie/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [
    trigger('state', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 100
      })),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('250ms ease-out'))      
    ])
  ]
})
export class SearchResultsComponent implements OnInit {
  results: Movie[];
  state: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { 
    this.state = 'inactive';
  }
  
  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.movieService.fetchWithKeyword(params.get('query'));
    }).subscribe((data) => {
      this.results = data['results'];
      this.state = 'active';
    }, (err) => console.log(err));
  }

}
