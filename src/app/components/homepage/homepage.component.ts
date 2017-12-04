import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';

import { Movie, MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchFocused: boolean;
  title: string;
  
  constructor(private movieService: MovieService, private router: Router) {
    this.searchFocused = false;
  }
  
  ngOnInit() { 
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  onSearchFocus(focused: boolean) {
    this.searchFocused = focused;
  }

  onSearchSubmit(query: string) {
    this.router.navigate(['search', 'movie', query]);
  }

}